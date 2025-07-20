#!/bin/bash
echo "================================================"
echo "PNG to SVG Converter for Iconography"
echo "================================================"

# Create output directory
mkdir -p svgs
echo "✅ Created svgs/ directory"

# Source directory
SOURCE_DIR="visualelements/iconography"
OUTPUT_DIR="svgs"

echo "📁 Converting images from: $SOURCE_DIR"
echo "💾 Saving SVGs to: $OUTPUT_DIR"
echo ""

# Method 1: Simple SVG embedding (works without additional tools)
convert_simple() {
    local input_file="$1"
    local output_file="$2"
    local filename=$(basename "$input_file" .png)
    
    # Get image dimensions
    if command -v identify >/dev/null 2>&1; then
        # Use ImageMagick if available
        dimensions=$(identify -format "%wx%h" "$input_file")
        width=$(echo $dimensions | cut -d'x' -f1)
        height=$(echo $dimensions | cut -d'x' -f2)
    else
        # Default dimensions if ImageMagick not available
        width="500"
        height="500"
    fi
    
    # Convert PNG to base64
    base64_data=$(base64 -i "$input_file")
    
    # Create SVG with embedded PNG
    cat > "$output_file" << SVG_EOF
<?xml version="1.0" encoding="UTF-8"?>
<svg width="$width" height="$height" viewBox="0 0 $width $height" xmlns="http://www.w3.org/2000/svg">
  <title>$filename</title>
  <image x="0" y="0" width="$width" height="$height" href="data:image/png;base64,$base64_data"/>
</svg>
SVG_EOF
}

# Method 2: Auto-trace conversion (true vector - requires autotrace)
convert_traced() {
    local input_file="$1"
    local output_file="$2"
    
    if command -v autotrace >/dev/null 2>&1; then
        autotrace --input-format=png --output-format=svg --output-file="$output_file" "$input_file"
        return $?
    else
        return 1
    fi
}

# Check available tools
echo "🔍 Checking available conversion tools..."
HAS_IMAGEMAGICK=false
HAS_AUTOTRACE=false

if command -v identify >/dev/null 2>&1; then
    echo "✅ ImageMagick found (for dimensions)"
    HAS_IMAGEMAGICK=true
else
    echo "⚠️  ImageMagick not found (will use default dimensions)"
fi

if command -v autotrace >/dev/null 2>&1; then
    echo "✅ AutoTrace found (for vector tracing)"
    HAS_AUTOTRACE=true
else
    echo "⚠️  AutoTrace not found (will use embedding method)"
    echo "   To install: brew install autotrace"
fi

echo ""
echo "🚀 Starting conversion..."

# Convert each PNG file
count=0
for png_file in "$SOURCE_DIR"/*.png; do
    if [[ -f "$png_file" ]]; then
        filename=$(basename "$png_file" .png)
        svg_embedded="$OUTPUT_DIR/${filename}_embedded.svg"
        svg_traced="$OUTPUT_DIR/${filename}_traced.svg"
        svg_simple="$OUTPUT_DIR/${filename}.svg"
        
        echo "📸 Converting: $filename.png"
        
        # Always create embedded version
        convert_simple "$png_file" "$svg_embedded"
        echo "   ✅ Created embedded SVG: ${filename}_embedded.svg"
        
        # Try traced version if autotrace available
        if $HAS_AUTOTRACE; then
            if convert_traced "$png_file" "$svg_traced"; then
                echo "   ✅ Created traced SVG: ${filename}_traced.svg"
                # Copy the traced version as the main SVG
                cp "$svg_traced" "$svg_simple"
                echo "   ✅ Main SVG uses traced version: ${filename}.svg"
            else
                echo "   ⚠️  Tracing failed, using embedded version"
                cp "$svg_embedded" "$svg_simple"
            fi
        else
            # Use embedded version as main SVG
            cp "$svg_embedded" "$svg_simple"
            echo "   ✅ Main SVG uses embedded version: ${filename}.svg"
        fi
        
        count=$((count + 1))
        echo ""
    fi
done

echo "================================================"
echo "✅ Conversion Complete!"
echo "📊 Converted $count PNG files"
echo "📁 SVG files saved in: $OUTPUT_DIR/"
echo ""
echo "📋 What was created:"
echo "   • ${filename}.svg - Main SVG files (best available method)"
echo "   • ${filename}_embedded.svg - PNG embedded in SVG wrapper"
if $HAS_AUTOTRACE; then
    echo "   • ${filename}_traced.svg - True vector traced versions"
fi
echo ""
echo "💡 File size comparison:"
ls -lh "$SOURCE_DIR"/*.png | head -3
echo "   vs"
ls -lh "$OUTPUT_DIR"/*.svg | head -3
echo ""
echo "🎯 To install better conversion tools:"
echo "   brew install imagemagick autotrace"
