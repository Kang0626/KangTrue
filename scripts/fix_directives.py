files = [
    'src/components/ui/CaptureSlot.tsx',
    'src/components/AboutSection.tsx',
    'src/components/PipelineToolSection.tsx'
]
for fpath in files:
    with open(fpath, 'r', encoding='utf-8') as f:
        text = f.read()
    if text.startswith("use client';"):
        text = "'" + text
        with open(fpath, 'w', encoding='utf-8') as f:
            f.write(text)
        print(f"Fixed {fpath}")
    else:
        print(f"Checked {fpath}: already OK")
