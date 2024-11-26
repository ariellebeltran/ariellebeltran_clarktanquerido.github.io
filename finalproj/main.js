// VISUALIZATION 01 ===========================================================================================================
async function loadDataAndCreateSpotifyChart() {
    // Load the CSV file (adjust the path as necessary)
    const data = await d3.csv("../datasets/spotify_demog_2013_2023 - Sheet1.csv");

    // Process the data
    const processedData = data.map(d => ({
        Year: parseInt(d.Year, 10),  // Convert 'Year' to an integer
        "Age Group": d["Age Group"],
        "Users in Age Groups (Millions)": +d["Users in Age Groups (Millions)"]
    }));

    // Vega-Lite specification
    const yourVlSpec = {
        $schema: "https://vega.github.io/schema/vega-lite/v5.json",
        description: "Line chart showing Spotify user demographics over time.",
        data: { values: processedData }, // Use the processed data
        mark: "line", // Line chart
        width: 600,  // Set the width of the chart
        height: 400, // Set the height of the chart
        encoding: {
            x: { 
                field: "Year", 
                type: "ordinal",  // Use ordinal scale for years
                title: "Year",
                axis: { 
                    labelAngle: 0  // Rotate the labels by 0 degrees
                }
            }, // x-axis for years
            y: {
                field: "Users in Age Groups (Millions)",
                type: "quantitative",
                title: "Users in Age Groups (Millions)"
            }, // y-axis for user count
            color: { 
                field: "Age Group", 
                type: "nominal", 
                legend: { title: "Age Group" } 
            }, // Color by age group
            tooltip: [
                { field: "Year", type: "ordinal", title: "Year" },
                { field: "Age Group", type: "nominal", title: "Age Group" },
                {
                    field: "Users in Age Groups (Millions)",
                    type: "quantitative",
                    title: "Users (Millions)"
                }
            ] // Tooltip details
        }
    };

    // Embed the Vega-Lite chart
    vegaEmbed("#spotifyDemographicsChart", yourVlSpec);
}

// Call the function to load data and create the chart
loadDataAndCreateSpotifyChart();

// VISUALIZATION 02 ===========================================================================================================

async function loadSpotifyGenresOverTimeChart() {
    // Load the CSV file (adjust the path as necessary)
    const data = await d3.csv("../datasets/top_10_genres_2010_2023 - top_10_genres_2010_2023@1.csv");

    // Vega-Lite specification
    const yourVlSpec = {
        "$schema": "https://vega.github.io/schema/vega-lite/v5.json",
        "description": "Line chart for all genres over time",
        "data": {
            "values": data // Use the loaded data directly
        },
        "mark": "line",
        width: 600,  // Set the width of the chart
        height: 400, // Set the height of the chart
        "encoding": {
            "x": {
                "field": "year",
                "type": "ordinal",
                "title": "Year",
                axis: { 
                    labelAngle: 0  // Rotate the labels by 45 degrees
                }
            },
            "y": {
                "field": "count",
                "type": "quantitative",
                "title": "Count"
            },
            "color": {
                "field": "main_genre",
                "type": "nominal",
                "legend": {
                    "title": "Main Genre"
                }
            },
            "tooltip": [
                {"field": "year", "title": "Year"},
                {"field": "count", "title": "Count"},
                {"field": "main_genre", "title": "Genre"}
            ]
        }
    };

    // Embed the Vega-Lite chart into the div with the ID 'spotifyGenresOverTimeChart'
    vegaEmbed("#spotifyGenresOverTimeChart", yourVlSpec);
}

// Call the function to load data and create the chart
loadSpotifyGenresOverTimeChart();

// VISUALIZATION 00 ===========================================================================================================