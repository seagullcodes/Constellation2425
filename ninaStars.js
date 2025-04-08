// Example star data and marker creation logic

const stars = [
    {
        title: "#1 | Portfolio Feedback Roboctopi",
        description: "Escondido, USA<br><i>April 23, 2024</i>",
        takeaway: "We focused on providing feedback to refine their portfolios visual branding and consistency.",
        color: "#861f18ff",
        coordinates: { lat: 33.1192, lng: -117.0864 }
    },
    {
        title: "PF Fulminata",
        description: "Seguin, USA",
        color: "#d94234ff",
        coordinates: { lat: 29.5688, lng: -97.9647 }
    }
];

// Function to create a star icon (SVG)
function createStarIcon(color) {
    const svg = `
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
            <polygon points="12,2 15,10 24,10 17,15 20,23 12,18 4,23 7,15 0,10 9,10"
                fill="${color}" stroke="black" stroke-width="1"/>
        </svg>`;
    const encodedSVG = encodeURIComponent(svg);
    return new maplibregl.Marker({
        element: document.createElement('div').classList.add('star-marker')
    })
    .setLngLat([0, 0]) // Coordinates set later
    .getElement().style.backgroundImage = `url('data:image/svg+xml;utf8,${encodedSVG}')`;
}

// Function to create star markers
function createStarMarkers() {
    stars.forEach(star => {
        const markerIcon = createStarIcon(star.color);
        const marker = markerIcon.setLngLat([star.coordinates.lng, star.coordinates.lat]).addTo(map);

        const popupContent = `
            <div style="max-width:250px;">
                <h4>${star.title}</h4>
                <p>${star.description}</p>
                <p>${star.takeaway}</p>
                <button onclick="map.closePopup()">Close</button>
            </div>
        `;
        marker.setPopup(new maplibregl.Popup().setHTML(popupContent)); // Bind popup to the marker
    });
}
