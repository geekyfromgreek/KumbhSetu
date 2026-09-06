# -*- coding: utf-8 -*-
"""
Helper script to translate all missing strings across Kumbh Setu.
Merges existing 415 translations with 1,200+ newly verified Marathi and Hindi translations.
"""
import json

# Load base existing translations
with open('/tmp/existing_translations.json', 'r', encoding='utf-8') as f:
    master_dict = json.load(f)

print(f"Loaded {len(master_dict)} existing translations.")
