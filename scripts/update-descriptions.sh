#!/bin/bash

# Setlist Street - Update Consolidated Descriptions Script
# This script combines all individual description files into one master file

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
DESC_DIR="$SCRIPT_DIR/../pagetextdescriptions"
OUTPUT_FILE="$DESC_DIR/MASTER_CONSOLIDATED_DESCRIPTIONS.md"

echo "🔄 Updating consolidated descriptions..."

# Create the header
cat > "$OUTPUT_FILE" << EOF
# SETLIST STREET - MASTER CONSOLIDATED DESCRIPTIONS
# Generated automatically from individual description files
# Last updated: $(date -u +"%Y-%m-%d %H:%M:%S UTC")

===============================================================================
MAIN PAGES
===============================================================================

EOF

# Function to add a section
add_section() {
    local title="$1"
    local filename="$2"
    
    echo "## $title" >> "$OUTPUT_FILE"
    echo "Source: $filename" >> "$OUTPUT_FILE"
    echo "" >> "$OUTPUT_FILE"
    
    if [ -f "$DESC_DIR/$filename" ]; then
        cat "$DESC_DIR/$filename" >> "$OUTPUT_FILE"
    else
        echo "[ERROR: File $filename not found]" >> "$OUTPUT_FILE"
    fi
    
    echo "" >> "$OUTPUT_FILE"
    echo "" >> "$OUTPUT_FILE"
}

# Add main pages
add_section "HOMESCREEN DESCRIPTION" "homescreen_description"
add_section "ABOUT THE APP DESCRIPTION" "aboutheapp_description"
add_section "RULES DESCRIPTION" "rules_description"
add_section "FAQ DESCRIPTION" "faq_description"
add_section "SETLIST HINTS DESCRIPTION" "setlisthints_description"

# Add section divider for core games
cat >> "$OUTPUT_FILE" << EOF
===============================================================================
CORE GAME PAGES - MAIN GAMES
===============================================================================

EOF

add_section "GUESS THE OPENER DESCRIPTION" "guesstheeopener_description"
add_section "GUESS THE ENCORE DESCRIPTION" "guesstheencore_description"
add_section "GUESS THE BUST OUT DESCRIPTION" "guessthebustout_description"
add_section "SETLIST BINGO DESCRIPTION" "setlistbingo_description"
add_section "SETLIST BUILDER DESCRIPTION" "setlistbuilder_description"

# Add timing games section
cat >> "$OUTPUT_FILE" << EOF
===============================================================================
TIMING GAMES
===============================================================================

EOF

add_section "GUESS START TIME DESCRIPTION" "guessthestarttime_description"
add_section "GUESS END TIME DESCRIPTION" "guesstheendtime_description"
add_section "GUESS SET BREAK LENGTH DESCRIPTION" "guessthesetbreaklength_description"

# Add advanced song games section
cat >> "$OUTPUT_FILE" << EOF
===============================================================================
ADVANCED SONG GAMES
===============================================================================

EOF

add_section "GUESS SET 2 OPENER DESCRIPTION" "guesstheset2opener_description"
add_section "GUESS SET 1 CLOSER DESCRIPTION" "guesstheset1closer_description"
add_section "GUESS SET 2 CLOSER DESCRIPTION" "guesstheset2closer_description"
add_section "GUESS PRE DRUMS SONG DESCRIPTION" "guessthepredrumssong_description"
add_section "GUESS POST DRUMS SONG DESCRIPTION" "guessthepostdrumssong_description"

# Add special games section
cat >> "$OUTPUT_FILE" << EOF
===============================================================================
SPECIAL GAMES
===============================================================================

EOF

add_section "GUESS SONGS NOT PLAYED DESCRIPTION" "guesssongs notplayed_description"
add_section "GUESS NEXT SONG (LIVE) DESCRIPTION" "guessnextsong_description"

# Add results pages section
cat >> "$OUTPUT_FILE" << EOF
===============================================================================
RESULTS PAGES
===============================================================================

EOF

add_section "RESULTS PAGE DESCRIPTION" "resultspage_description"
add_section "SETLIST BUILDER RESULTS DESCRIPTION" "setlistbuilderresults_description"
add_section "GUESS SONG RESULTS DESCRIPTION" "guessthesongresults_description"
add_section "SETLIST BINGO RESULTS DESCRIPTION" "setlistbingoresults_description"

# Add user pages section
cat >> "$OUTPUT_FILE" << EOF
===============================================================================
USER PAGES
===============================================================================

EOF

add_section "SIGNUP FORM DESCRIPTION" "signupform_description"

# Add admin/technical section
cat >> "$OUTPUT_FILE" << EOF
===============================================================================
ADMIN & TECHNICAL
===============================================================================

EOF

add_section "ADMIN DESCRIPTION" "admin_description"

# Add legal section
cat >> "$OUTPUT_FILE" << EOF
===============================================================================
LEGAL & TERMS
===============================================================================

EOF

add_section "TERMS OF SERVICE DESCRIPTION" "termsofservice_description"

# Add planning section
cat >> "$OUTPUT_FILE" << EOF
===============================================================================
PLANNING & REQUIREMENTS
===============================================================================

EOF

add_section "USER STORIES & REQUIREMENTS" "user_stories_description"

# Add footer
cat >> "$OUTPUT_FILE" << EOF
===============================================================================
END OF MASTER CONSOLIDATED DESCRIPTIONS
===============================================================================
EOF

# Calculate file size and stats
file_size=$(du -h "$OUTPUT_FILE" | cut -f1)
line_count=$(wc -l < "$OUTPUT_FILE")
section_count=9

echo "✅ Successfully updated MASTER_CONSOLIDATED_DESCRIPTIONS.md"
echo "📄 File size: $file_size"
echo "📋 Total lines: $line_count"
echo "📊 Sections: $section_count"
echo "🎮 Games included: 15 total games"
echo "📈 Features: Setlist Hints, Live Next Song, Probability Tooltips"

echo ""
echo "🔗 To run this script:"
echo "   chmod +x scripts/update-descriptions.sh"
echo "   ./scripts/update-descriptions.sh" 