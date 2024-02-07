import os
from PIL import Image
import cairosvg

def convert_svg_to_png(input_path, output_path, size):
    # Ensure the output directory exists
    os.makedirs(os.path.dirname(output_path), exist_ok=True)

    # Convert SVG to PNG
    cairosvg.svg2png(url=input_path, write_to=output_path, output_width=size, output_height=size)

def create_ico(png_paths, output_path):
    # List of PNG paths for different sizes
    png_images = [Image.open(png_path) for png_path in png_paths]

    # Create an ICO file from multiple PNG images
    png_images[0].save(output_path, format="ICO", sizes=[(16, 16), (32, 32), (48, 48), (256, 256)])

def main():
    svg_path = '../src/logo.svg'
    output192 = '../public/logo192.png'
    output512 = '../public/logo512.png'

    convert_svg_to_png(svg_path, output192, 192)
    convert_svg_to_png(svg_path, output512, 512)

    # Paths to the PNG files at different sizes
    png_paths = [
        f'../public/png/logo-{size}.png' for size in [16, 32, 48, 256]
    ]

    for size, png in zip([16, 32, 48, 256], png_paths):
        convert_svg_to_png(svg_path, png, size)

    # Output path for the ICO file
    ico_output_path = '../public/favicon.ico'

    # Create the ICO file
    create_ico(png_paths, ico_output_path)

if __name__ == "__main__":
    main()
