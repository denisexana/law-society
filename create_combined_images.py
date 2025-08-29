#!/usr/bin/env python3
"""
Image Combination Script for Surrey Students' Law Society Website
Combines logo with background images, creating a fade effect where logo becomes transparent at the top.
"""

from PIL import Image, ImageEnhance
import numpy as np
import os

def create_fade_mask(width, height, fade_start=0.3, fade_end=0.8):
    """
    Create a gradient mask for the fade effect.
    fade_start: Where the fade begins (0.0 = top, 1.0 = bottom)
    fade_end: Where the fade ends (0.0 = top, 1.0 = bottom)
    """
    mask = np.zeros((height, width), dtype=np.float32)
    
    for y in range(height):
        # Calculate fade position (0.0 to 1.0)
        pos = y / height
        
        if pos < fade_start:
            # Top: Logo fully visible
            mask[y, :] = 1.0
        elif pos > fade_end:
            # Bottom: Logo fully transparent
            mask[y, :] = 0.0
        else:
            # Middle: Gradual fade
            fade_pos = (pos - fade_start) / (fade_end - fade_start)
            mask[y, :] = 1.0 - fade_pos
    
    return mask

def combine_images(background_path, logo_path, output_path, logo_scale=0.6, fade_start=0.2, fade_end=0.7):
    """
    Combine background image with logo using fade effect.
    
    Args:
        background_path: Path to background image
        logo_path: Path to logo image
        output_path: Path for output image
        logo_scale: Scale factor for logo (0.0 to 1.0)
        fade_start: Where fade begins (0.0 = top, 1.0 = bottom)
        fade_end: Where fade ends (0.0 = top, 1.0 = bottom)
    """
    try:
        # Open images
        background = Image.open(background_path).convert('RGBA')
        logo = Image.open(logo_path).convert('RGBA')
        
        # Get dimensions
        bg_width, bg_height = background.size
        logo_width, logo_height = logo.size
        
        # Calculate new logo size (maintain aspect ratio)
        new_logo_width = int(bg_width * logo_scale)
        new_logo_height = int(new_logo_width * logo_height / logo_width)
        
        # Resize logo
        logo = logo.resize((new_logo_width, new_logo_height), Image.Resampling.LANCZOS)
        
        # Create a new image with the same size as background
        combined = Image.new('RGBA', (bg_width, bg_height), (0, 0, 0, 0))
        
        # Create fade mask
        fade_mask = create_fade_mask(new_logo_width, new_logo_height, fade_start, fade_end)
        
        # Convert mask to PIL Image
        mask_image = Image.fromarray((fade_mask * 255).astype(np.uint8), 'L')
        
        # Apply fade mask to logo
        logo_with_fade = logo.copy()
        logo_with_fade.putalpha(Image.fromarray((fade_mask * 255).astype(np.uint8), 'L'))
        
        # Calculate position to center logo
        x_offset = (bg_width - new_logo_width) // 2
        y_offset = (bg_height - new_logo_height) // 2
        
        # Paste logo onto background
        combined.paste(logo_with_fade, (x_offset, y_offset), logo_with_fade)
        
        # Combine with background
        result = Image.alpha_composite(background, combined)
        
        # Save result
        result.save(output_path, 'PNG', quality=95)
        print(f"✅ Created: {output_path}")
        
        return True
        
    except Exception as e:
        print(f"❌ Error creating {output_path}: {str(e)}")
        return False

def enhance_background_image(image_path, output_path, brightness=1.1, contrast=1.2, saturation=1.1):
    """
    Enhance background image for better logo visibility.
    """
    try:
        # Open image
        img = Image.open(image_path).convert('RGB')
        
        # Enhance brightness
        enhancer = ImageEnhance.Brightness(img)
        img = enhancer.enhance(brightness)
        
        # Enhance contrast
        enhancer = ImageEnhance.Contrast(img)
        img = enhancer.enhance(contrast)
        
        # Enhance saturation
        enhancer = ImageEnhance.Color(img)
        img = enhancer.enhance(saturation)
        
        # Save enhanced image
        img.save(output_path, 'JPEG', quality=95)
        print(f"✅ Enhanced: {output_path}")
        
        return True
        
    except Exception as e:
        print(f"❌ Error enhancing {output_path}: {str(e)}")
        return False

def main():
    """Main function to create all combined images."""
    print("🎨 Creating Combined Images for Surrey Students' Law Society Website")
    print("=" * 70)
    
    # Check if images directory exists
    if not os.path.exists('images'):
        print("❌ Images directory not found. Please run this script from the project root.")
        return
    
    # Create enhanced versions of background images first
    print("\n📸 Step 1: Enhancing background images...")
    enhance_background_image('images/pic01.jpg', 'images/pic01_enhanced.jpg', brightness=1.1, contrast=1.2, saturation=1.1)
    enhance_background_image('images/pic02.jpg', 'images/pic02_enhanced.jpg', brightness=1.1, contrast=1.2, saturation=1.1)
    enhance_background_image('images/pic03.jpg', 'images/pic03_enhanced.jpg', brightness=1.1, contrast=1.2, saturation=1.1)
    
    print("\n🎭 Step 2: Creating combined images with logo fade effect...")
    
    # Create combined images
    combinations = [
        {
            'background': 'images/pic01_enhanced.jpg',
            'logo': 'images/Logo-no-bg.PNG',
            'output': 'images/pic01_combined.png',
            'logo_scale': 0.7,
            'fade_start': 0.15,
            'fade_end': 0.65
        },
        {
            'background': 'images/pic02_enhanced.jpg',
            'logo': 'images/Logo-no-bg.PNG',
            'output': 'images/pic02_combined.png',
            'logo_scale': 0.65,
            'fade_start': 0.2,
            'fade_end': 0.7
        },
        {
            'background': 'images/pic03_enhanced.jpg',
            'logo': 'images/Logo-no-bg.PNG',
            'output': 'images/pic03_combined.png',
            'logo_scale': 0.6,
            'fade_start': 0.25,
            'fade_end': 0.75
        }
    ]
    
    success_count = 0
    for combo in combinations:
        if combine_images(
            combo['background'],
            combo['logo'],
            combo['output'],
            logo_scale=combo['logo_scale'],
            fade_start=combo['fade_start'],
            fade_end=combo['fade_end']
        ):
            success_count += 1
    
    print(f"\n🎯 Results: {success_count}/{len(combinations)} images created successfully!")
    
    if success_count == len(combinations):
        print("\n✨ All images created successfully! Here's what to do next:")
        print("1. Review the new combined images in the 'images' folder")
        print("2. If you're happy with the results, update your HTML to use:")
        print("   - images/pic01_combined.png instead of images/pic01.jpg")
        print("   - images/pic02_combined.png instead of images/pic02.jpg")
        print("   - images/pic03_combined.png instead of images/pic03.jpg")
        print("3. The logo will now fade to transparent at the top of each image!")
    else:
        print("\n⚠️  Some images failed to create. Please check the error messages above.")
    
    print("\n🎨 Image creation complete!")

if __name__ == "__main__":
    main()
