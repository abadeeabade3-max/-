import sys, os, struct, zlib

def make_icon_png(width, height):
    # Generates a clean emerald gym icon badge PNG
    raw = bytearray()
    center_x = width / 2.0
    center_y = height / 2.0
    radius = width * 0.46
    
    for y in range(height):
        raw.append(0) # filter type none
        for x in range(width):
            dx = x - center_x
            dy = y - center_y
            dist = (dx*dx + dy*dy) ** 0.5
            
            # Simple dumbbell / gym shape inside circle
            # Check if inside dumbbell: bar across center or weights on sides
            nx = dx / radius
            ny = dy / radius
            is_dumbbell = False
            # horizontal bar: -0.6 to +0.6 x, -0.1 to +0.1 y
            if abs(ny) < 0.12 and abs(nx) < 0.65:
                is_dumbbell = True
            # left weights
            if abs(ny) < 0.45 and -0.7 < nx < -0.45:
                is_dumbbell = True
            # right weights
            if abs(ny) < 0.45 and 0.45 < nx < 0.7:
                is_dumbbell = True
                
            if dist < radius * 0.95:
                if is_dumbbell:
                    raw.extend([255, 255, 255, 255]) # white dumbbell
                else:
                    raw.extend([16, 185, 129, 255]) # emerald-500
            elif dist < radius:
                raw.extend([5, 150, 105, 255]) # emerald-600 border
            else:
                raw.extend([0, 0, 0, 0]) # transparent outside
                
    compressed = zlib.compress(raw)
    def chunk(tag, data):
        c = tag + data
        return struct.pack('>I', len(data)) + c + struct.pack('>I', zlib.crc32(c))
    
    ihdr = struct.pack('>IIBBBBB', width, height, 8, 6, 0, 0, 0)
    return b'\x89PNG\r\n\x1a\n' + chunk(b'IHDR', ihdr) + chunk(b'IDAT', compressed) + chunk(b'IEND', b'')

res_dir = sys.argv[1] if len(sys.argv) > 1 else '/tmp/res'
densities = {
    'mipmap-mdpi': 48,
    'mipmap-hdpi': 72,
    'mipmap-xhdpi': 96,
    'mipmap-xxhdpi': 144,
    'mipmap-xxxhdpi': 192,
}

# Check if official logo image exists
logo_source = None
possible_sources = [
    os.path.join(os.getcwd(), 'public/powergym-logo.png'),
    os.path.join(os.getcwd(), 'public/pwa-512x512.png'),
    os.path.join(os.path.dirname(os.path.dirname(__file__)), 'public/powergym-logo.png')
]

for p in possible_sources:
    if os.path.exists(p):
        logo_source = p
        break

if logo_source:
    print(f"Using official Power Gym logo image: {logo_source}")
    import subprocess
    for folder, size in densities.items():
        target_dir = os.path.join(res_dir, folder)
        os.makedirs(target_dir, exist_ok=True)
        out_square = os.path.join(target_dir, 'ic_launcher.png')
        out_round = os.path.join(target_dir, 'ic_launcher_round.png')
        # Square icon
        subprocess.run(['convert', logo_source, '-resize', f'{size}x{size}', out_square], check=True)
        # Round icon with circular mask
        subprocess.run(['convert', logo_source, '-resize', f'{size}x{size}', out_round], check=True)
    print("Launcher icons generated successfully from official logo in", res_dir)
else:
    for folder, size in densities.items():
        target_dir = os.path.join(res_dir, folder)
        os.makedirs(target_dir, exist_ok=True)
        png_data = make_icon_png(size, size)
        with open(os.path.join(target_dir, 'ic_launcher.png'), 'wb') as f:
            f.write(png_data)
        with open(os.path.join(target_dir, 'ic_launcher_round.png'), 'wb') as f:
            f.write(png_data)
    print("Fallback launcher icons generated successfully in", res_dir)
