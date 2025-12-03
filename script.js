document.addEventListener('DOMContentLoaded', () => {
    // State
    let state = {
        hue: 0,
        saturation: 100,
        lightness: 50,
        colorName: 'Red'
    };

    // DOM Elements
    const colorPreview = document.getElementById('colorPreview');
    const saturationSlider = document.getElementById('saturationSlider');
    const colorSelector = document.getElementById('colorSelector');
    
    // Info Elements
    const elColorName = document.getElementById('colorName');
    const elSaturationValue = document.getElementById('saturationValue');
    const elHexValue = document.getElementById('hexValue');
    const elHslValue = document.getElementById('hslValue');

    // Initialize
    updateUI();

    // Event Listeners
    saturationSlider.addEventListener('input', (e) => {
        state.saturation = parseInt(e.target.value);
        updateUI();
    });

    colorSelector.addEventListener('click', (e) => {
        const btn = e.target.closest('.color-btn');
        if (!btn) return;

        // Update active state
        document.querySelectorAll('.color-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        // Update state
        state.hue = parseInt(btn.dataset.hue);
        state.colorName = btn.dataset.colorName;
        
        // Reset saturation to 100 on color change? Or keep current?
        // Let's keep current saturation as per "slider" behavior usually expected, 
        // but user might want to see "pure" color first. 
        // Requirement says "select color to use as base", implying we switch base hue.
        // We will keep the current saturation slider position to allow comparing saturation across colors.
        
        updateUI();
    });

    function updateUI() {
        // Calculate colors
        const hslString = `hsl(${state.hue}, ${state.saturation}%, ${state.lightness}%)`;
        
        // Update Preview
        colorPreview.style.backgroundColor = hslString;
        
        // Update Info Panel
        elColorName.textContent = state.colorName;
        elSaturationValue.textContent = `${state.saturation}%`;
        elHslValue.textContent = hslString;
        elHexValue.textContent = hslToHex(state.hue, state.saturation, state.lightness);
    }

    // Helper: HSL to Hex
    function hslToHex(h, s, l) {
        l /= 100;
        const a = s * Math.min(l, 1 - l) / 100;
        const f = n => {
            const k = (n + h / 30) % 12;
            const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
            return Math.round(255 * color).toString(16).padStart(2, '0');
        };
        return `#${f(0)}${f(8)}${f(4)}`.toUpperCase();
    }
});
