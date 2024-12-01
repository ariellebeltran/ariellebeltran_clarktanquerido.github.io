// // VISUALIZATION 01 ===========================================================================================================
// async function loadDataAndCreateSpotifyChart() {
//     // Load the CSV file (adjust the path as necessary)
//     const data = await d3.csv("../datasets/spotify_demog_2013_2023 - Sheet1.csv");

//     // Process the data
//     const processedData = data.map(d => ({
//         Year: parseInt(d.Year, 10),  // Convert 'Year' to an integer
//         "Age Group": d["Age Group"],
//         "Users in Age Groups (Millions)": +d["Users in Age Groups (Millions)"]
//     }));

//     // Vega-Lite specification
//     const yourVlSpec = {
//         $schema: "https://vega.github.io/schema/vega-lite/v5.json",
//         description: "Line chart showing Spotify user demographics over time.",
//         data: { values: processedData }, // Use the processed data
//         mark: "line", // Line chart
//         width: 690,  // Set the width of the chart
//         height: 400, // Set the height of the chart
//         autosize: { type: "fit", contains: "padding" }, // Enables fitting to container
//         encoding: {
//             x: {
//                 field: "Year",
//                 type: "ordinal",  // Use ordinal scale for years
//                 title: "Year",
//                 axis: {
//                     labelAngle: 0  // Rotate the labels by 0 degrees
//                 }
//             }, // x-axis for years
//             y: {
//                 field: "Users in Age Groups (Millions)",
//                 type: "quantitative",
//                 title: "Users in Age Groups (Millions)"
//             }, // y-axis for user count
//             color: {
//                 field: "Age Group",
//                 type: "nominal",
//                 legend: { title: "Age Group" }
//             }, // Color by age group
//             tooltip: [
//                 { field: "Year", type: "ordinal", title: "Year" },
//                 { field: "Age Group", type: "nominal", title: "Age Group" },
//                 {
//                     field: "Users in Age Groups (Millions)",
//                     type: "quantitative",
//                     title: "Users (Millions)"
//                 }
//             ] // Tooltip details
//         }
//     };

//     // Embed the Vega-Lite chart
//     vegaEmbed("#spotifyDemographicsChart", yourVlSpec);
// }

// // Call the function to load data and create the chart
// loadDataAndCreateSpotifyChart();

// // VISUALIZATION 02 ===========================================================================================================

// async function loadSpotifyGenresOverTimeChart() {
//     // Vega-Lite specification
//     const vlSpec = {
//         $schema: "https://vega.github.io/schema/vega-lite/v5.json",
//         description: "Line chart for all genres over time",
//         data: {
//             url: "../datasets/top_5_genres_2013_2023_by_streams.csv"
//         },
//         "mark": "line",
//         width: 700,  // Set the width of the chart
//         height: 400, // Set the height of the chart,
//         autosize: { type: "fit", contains: "padding" }, // Enables fitting to container
//         "layer": [
//             {
//                 "mark": { "type": "line", "strokeWidth": 2 },
//                 "encoding": {
//                     "x": {
//                         "field": "year",
//                         "type": "ordinal",
//                         "title": "Year",
//                         axis: {
//                             labelAngle: 0  // Rotate the labels by 45 degrees
//                         },
                        
//                     },
//                     "y": {
//                         "field": "Streams",
//                         "type": "quantitative",
//                         "title": "Total Streams (in Billions)",
//                         "axis": { "format": ".2s" }
//                     },
//                     "color": {
//                         "field": "main_genre",
//                         "type": "nominal",
//                         "legend": { "title": "Main Genre" }
//                     }
//                 }
//             },
//             {
//                 "mark": { "type": "line", "strokeWidth": 10, "opacity": 0 },
//                 "encoding": {
//                     "x": { "field": "year", "type": "ordinal", "axis": {"format": "d"}},
//                     "y": { "field": "Streams", "type": "quantitative" },
//                     "color": { "field": "main_genre", "type": "nominal" },
//                     "tooltip": [
//                         { "field": "year", "title": "Year:", "axis": {"format": "d"}},
//                         { "field": "Streams", "title": "Streams:", "format": ".2s" },
//                         { "field": "main_genre", "title": "Genre:" }
//                     ]
//                 }
//             }
//         ],
//         config: {
//             mark: {
//                 strokeOpacity: 0.8
//             }
//         }
//     };

//     // Embed the Vega-Lite chart in the container
//     vegaEmbed("#spotifyGenresOverTimeChart", vlSpec).catch(console.error);
// }

// // Call the function to load the chart
// loadSpotifyGenresOverTimeChart();

// // VISUALIZATION 2.5 ===========================================================================================================

// async function loadBarCharts() {
//     // Load the CSV data
//     const data = await d3.csv("../datasets/spotify_2013_2023 - Music_Genres_2013_2023.csv");

//     // Convert Percentage to numeric values (remove '%' symbol and divide by 100)
//     const formattedData = data.map(d => ({
//         ...d,
//         Percentage: parseFloat(d.Percentage.replace('%', '')) / 100, // Convert to numeric and divide by 100
//         Year: +d.Year // Ensure Year is treated as a number
//     }));

//     // Filter data for 2013 and 2023
//     const data2013 = formattedData.filter(d => d.Year === 2013);
//     const data2023 = formattedData.filter(d => d.Year === 2023);

//     // Sort data by percentage in descending order
//     const sortDataByPercentage = (data) => data.sort((a, b) => b.Percentage - a.Percentage);

//     // Sort the data for 2013 and 2023
//     const sortedData2013 = sortDataByPercentage(data2013);
//     const sortedData2023 = sortDataByPercentage(data2023);

//     // Prepare data for Bar Chart for 2013 (both Millennials and Gen Z)
//     const barChart2013 = {
//         $schema: "https://vega.github.io/schema/vega-lite/v5.json",
//         title: "Top Music Genres - 2013",
//         data: { values: sortedData2013 },
//         mark: "bar", // Bar chart mark
//         encoding: {
//             x: { field: "Top Music Genres", type: "nominal", title: "Genre", axis: { labelAngle: -45 } },
//             y: { field: "Percentage", type: "quantitative", title: "Percentage", axis: { format: ".1%" } },
//             color: { field: "Age Group", type: "nominal", legend: { title: "Age Group" } },
//             tooltip: [
//                 { field: "Top Music Genres", title: "Genre" },
//                 { field: "Percentage", title: "Percentage", type: "quantitative", format: ".1%" },
//                 { field: "Age Group", title: "Age Group" }
//             ]
//         },
//         width: 665,
//         height: 500,
//         autosize: { type: "fit", contains: "padding" } // Enables fitting to container
//     };

//     // Embed bar chart for 2013 (both Millennials and Gen Z)
//     vegaEmbed("#barChart2013", barChart2013);

//     // Prepare data for Bar Chart for 2023 (both Millennials and Gen Z)
//     const barChart2023 = {
//         $schema: "https://vega.github.io/schema/vega-lite/v5.json",
//         title: "Top Music Genres - 2023",
//         data: { values: sortedData2023 },
//         mark: "bar", // Bar chart mark
//         encoding: {
//             x: { field: "Top Music Genres", type: "nominal", title: "Genre", axis: { labelAngle: -45 } },
//             y: { field: "Percentage", type: "quantitative", title: "Percentage", axis: { format: ".1%" } },
//             color: { field: "Age Group", type: "nominal", legend: { title: "Age Group" } },
//             tooltip: [
//                 { field: "Top Music Genres", title: "Genre" },
//                 { field: "Percentage", title: "Percentage", type: "quantitative", format: ".1%" },
//                 { field: "Age Group", title: "Age Group" }
//             ]
//         },
//         width: 665,
//         height: 500,
//         autosize: { type: "fit", contains: "padding" } // Enables fitting to container
//     };

//     // Embed bar chart for 2023 (both Millennials and Gen Z)
//     vegaEmbed("#barChart2023", barChart2023);
// }

// // Call the function to load data and render the bar charts
// loadBarCharts();


// NEW ITERATION

// Import required libraries
// import * as d3 from 'd3';
// import vegaEmbed from 'vega-embed';

// Function to load data and create the chart
async function loadSpotifyAgeDemog() {
    // Vega-Lite specification for the pie chart
    const yourVlSpec = {
        $schema: "https://vega.github.io/schema/vega-lite/v5.json",
        description: "Pie chart showing Spotify age demographics in 2023.",
        width: 400,
        height: 400,
        data: {
            values: [
                {"age": "18-24", "percentage": 26},
                {"age": "25-34", "percentage": 29},
                {"age": "35-44", "percentage": 16},
                {"age": "45-54", "percentage": 11},
                {"age": "55+", "percentage": 19}
            ]
        },
        mark: {
            type: "arc",
            tooltip: true
        },
        encoding: {
            theta: {field: "percentage", type: "quantitative"},
            color: {field: "age", type: "nominal", legend: {title: "Age Group"}},
            tooltip: [
                {field: "age", type: "nominal", title: "Age Group"},
                {field: "percentage", type: "quantitative", title: "Percentage (%)"}
            ]
        },
        view: {stroke: null},
        title: "Spotify Age Demographics (2023)"
    };

    // Embed the Vega-Lite chart
    vegaEmbed('#spotifyAgeDemographicsChart', yourVlSpec);
}

// Call the function to create the chart
loadSpotifyAgeDemog();


// Function to load data and create the chart
async function loadSpotifyAgeDemogHighlighted() {
    // Vega-Lite specification for the pie chart with highlighted age group
    const yourVlSpec = {
        $schema: "https://vega.github.io/schema/vega-lite/v5.json",
        description: "Pie chart showing Spotify age demographics in 2023, highlighting the 25-34 age group.",
        width: 400,
        height: 400,
        data: {
            values: [
                {"age": "18-24", "percentage": 26},
                {"age": "25-34", "percentage": 29},
                {"age": "35-44", "percentage": 16},
                {"age": "45-54", "percentage": 11},
                {"age": "55+", "percentage": 19}
            ]
        },
        mark: {
            type: "arc",
            tooltip: true
        },
        encoding: {
            theta: { field: "percentage", type: "quantitative" },
            color: {
                field: "age",
                type: "nominal",
                scale: {
                    domain: ["18-24", "25-34", "35-44", "45-54", "55+"],
                    range: ["#d3d3d3", "#ff6347", "#d3d3d3", "#d3d3d3", "#d3d3d3"] // Highlighting "25-34" with a distinct color
                },
                legend: { title: "Age Group" }
            },
            tooltip: [
                { field: "age", type: "nominal", title: "Age Group" },
                { field: "percentage", type: "quantitative", title: "Percentage (%)" }
            ]
        },
        view: { stroke: null },
        title: "Spotify Age Demographics (2023)"
    };

    // Embed the Vega-Lite chart
    vegaEmbed('#spotifyDemographicsChartHighlighted', yourVlSpec);
}

// Call the function to create the chart
loadSpotifyAgeDemogHighlighted();

// Function to load data and create the chart
async function loadSpotifyUsersChart() {
    // Load the CSV file (adjust the path as necessary)
    const data = await d3.csv("../datasets/spotify_demog_2013_2023 - Sheet1.csv");

    // Process the data
    const processedData = data.map(d => ({
        Year: parseInt(d.Year, 10),  // Convert 'Year' to an integer
        "Age Group": d["Age Group"],
        "Users in Age Groups (Millions)": +d["Users in Age Groups (Millions)"]
    }));

    // Vega-Lite specification for the faceted bar chart
    const yourVlSpec = {
        $schema: "https://vega.github.io/schema/vega-lite/v5.json",
        description: "Bar chart showing Spotify user demographics over time, separated by year.",
        data: { values: processedData }, // Use the processed data
        mark: "bar", // Bar chart
        width: 100,  // Set the width of each subplot
        height: 300, // Set the height of each subplot
        facet: {
            field: "Year",  // Facet by year
            columns: 5  // Number of columns for the faceted subplots
        },
        spec: {
            encoding: {
                x: {
                    field: "Age Group",
                    type: "nominal",
                    title: "Age Group"
                },
                y: {
                    field: "Users in Age Groups (Millions)",
                    type: "quantitative",
                    title: "Users in Age Groups (Millions)"
                },
                color: {
                    field: "Age Group",
                    type: "nominal",
                    legend: { title: "Age Group" }
                },
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
        },
        resolve: { 
            scale: { 
                y: "independent"  // Allows each subplot to have its own y-scale
            }
        }
    };

    // Embed the Vega-Lite chart
    vegaEmbed("#spotifyUsersChart", yourVlSpec);
}

// Call the function to load data and create
loadSpotifyUsersChart();
