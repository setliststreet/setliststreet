#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Define the order of files to include in the consolidated description
const FILE_ORDER = {
  'MAIN PAGES': [
    'homescreen_description',
    'aboutheapp_description', 
    'rules_description',
    'faq_description'
  ],
  'CORE GAME PAGES - MAIN GAMES': [
    'guesstheeopener_description',
    'guesstheencore_description',
    'guessthebustout_description',
    'setlistbingo_description',
    'setlistbuilder_description'
  ],
  'TIMING GAMES': [
    'guessthestarttime_description',
    'guesstheendtime_description',
    'guessthesetbreaklength_description'
  ],
  'ADVANCED SONG GAMES': [
    'guesstheset2opener_description',
    'guesstheset1closer_description',
    'guesstheset2closer_description',
    'guessthepredrumssong_description',
    'guessthepostdrumssong_description'
  ],
  'SPECIAL GAMES': [
    'guesssongs notplayed_description'
  ],
  'RESULTS PAGES': [
    'resultspage_description',
    'setlistbuilderresults_description',
    'guessthesongresults_description',
    'setlistbingoresults_description'
  ],
  'USER PAGES': [
    'signupform_description'
  ],
  'ADMIN & TECHNICAL': [
    'admin_description'
  ],
  'LEGAL & TERMS': [
    'termsofservice_description'
  ]
};

function readDescriptionFile(filename) {
  const filePath = path.join(__dirname, '..', 'pagetextdescriptions', filename);
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    return content.trim();
  } catch (error) {
    console.warn(`Warning: Could not read ${filename}: ${error.message}`);
    return `[ERROR: Could not read ${filename}]`;
  }
}

function generateConsolidatedFile() {
  let consolidatedContent = [];
  
  // Header
  consolidatedContent.push('# SETLIST STREET - MASTER CONSOLIDATED DESCRIPTIONS');
  consolidatedContent.push('# Generated automatically from individual description files');
  consolidatedContent.push(`# Last updated: ${new Date().toISOString()}`);
  consolidatedContent.push('');
  
  // Process each section
  Object.entries(FILE_ORDER).forEach(([sectionName, files]) => {
    consolidatedContent.push('===============================================================================');
    consolidatedContent.push(sectionName);
    consolidatedContent.push('===============================================================================');
    consolidatedContent.push('');
    
    files.forEach(filename => {
      const content = readDescriptionFile(filename);
      const cleanName = filename.replace(/_/g, ' ').toUpperCase().replace(' DESCRIPTION', ' DESCRIPTION');
      
      consolidatedContent.push(`## ${cleanName}`);
      consolidatedContent.push(`Source: ${filename}`);
      consolidatedContent.push('');
      consolidatedContent.push(content);
      consolidatedContent.push('');
    });
  });
  
  // Footer
  consolidatedContent.push('===============================================================================');
  consolidatedContent.push('END OF MASTER CONSOLIDATED DESCRIPTIONS');
  consolidatedContent.push('===============================================================================');
  
  return consolidatedContent.join('\n');
}

function main() {
  try {
    console.log('🔄 Updating consolidated descriptions...');
    
    const consolidatedContent = generateConsolidatedFile();
    const outputPath = path.join(__dirname, '..', 'pagetextdescriptions', 'MASTER_CONSOLIDATED_DESCRIPTIONS.md');
    
    fs.writeFileSync(outputPath, consolidatedContent, 'utf8');
    
    console.log('✅ Successfully updated MASTER_CONSOLIDATED_DESCRIPTIONS.md');
    console.log(`📄 File size: ${(consolidatedContent.length / 1024).toFixed(1)} KB`);
    console.log(`📊 Sections: ${Object.keys(FILE_ORDER).length}`);
    console.log(`📋 Total files: ${Object.values(FILE_ORDER).flat().length}`);
    
  } catch (error) {
    console.error('❌ Error updating consolidated descriptions:', error.message);
    process.exit(1);
  }
}

// Run if called directly
if (require.main === module) {
  main();
}

module.exports = { generateConsolidatedFile, FILE_ORDER }; 