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
        width: 600,
        height: 600,
        data: {
            values:

                [
                    { "age": "18-24 (Gen Zs)", "percentage": 26 },
                    { "age": "25-44 (Millennials)", "percentage": 45 },
                    { "age": "45-54 (Gen X)", "percentage": 11 },
                    { "age": "55+ (Majority Baby Boomers)", "percentage": 19 }
                ]


            // [
            //     { "age": "18-24", "percentage": 26 },
            //     { "age": "25-34", "percentage": 29 },
            //     { "age": "35-44", "percentage": 16 },
            //     { "age": "45-54", "percentage": 11 },
            //     { "age": "55+", "percentage": 19 }
            // ]
        },
        mark: {
            type: "arc",
            tooltip: true
        },
        encoding: {
            theta: { field: "percentage", type: "quantitative" },
            color: { field: "age", type: "nominal", legend: { title: "Age Group" } },
            tooltip: [
                { field: "age", type: "nominal", title: "Age Group" },
                { field: "percentage", type: "quantitative", title: "Percentage (%)" }
            ]
        },
        view: { stroke: null },
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
        width: 600,
        height: 600,
        data: {
            values:
                [
                    { "age": "18-24", "percentage": 26 },
                    { "age": "25-44", "percentage": 45 },
                    { "age": "45-54", "percentage": 11 },
                    { "age": "55+", "percentage": 19 }
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
                    domain: ["18-24", "25-44", "45-54", "55+"],
                    range: ["#d3d3d3", "#F58518", "#d3d3d3", "#d3d3d3"] // Highlighting "25-34" with a distinct color
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

async function loadSpotifyUsersChart() {

    // Vega-Lite specification
    const yourVlSpec = {

        "$schema": "https://vega.github.io/schema/vega-lite/v5.json",
        "description": "Grouped bar chart showing Spotify user demographics for 2013 and 2023.",
        "data": {
            "values": [
                {
                    "Year": 2013,
                    "Age Group": "18-24",
                    "Users in Age Groups (Millions)": 17.5
                },
                {
                    "Year": 2013,
                    "Age Group": "25-34",
                    "Users in Age Groups (Millions)": 15
                },
                {
                    "Year": 2023,
                    "Age Group": "18-24",
                    "Users in Age Groups (Millions)": 150
                },
                {
                    "Year": 2023,
                    "Age Group": "25-34",
                    "Users in Age Groups (Millions)": 175
                }
            ]
        },
        "mark": "bar",
        "width": 690,
        "height": 400,
        "autosize": { "type": "fit", "contains": "padding" },
        "encoding": {
            "x": {
                "field": "Year",
                "type": "ordinal",
                "title": "Year",
                "axis": { "labelAngle": 0 },
                "offset": -30
            },
            "xOffset": {
                "field": "Age Group"
            },
            "y": {
                "field": "Users in Age Groups (Millions)",
                "type": "quantitative",
                "title": "Users in Age Groups (Millions)"
            },
            "color": {
                "field": "Age Group",
                "type": "nominal",
                "legend": { "title": "Age Group" }
            },
            "tooltip": [
                { "field": "Year", "type": "ordinal", "title": "Year" },
                { "field": "Age Group", "type": "nominal", "title": "Age Group" },
                {
                    "field": "Users in Age Groups (Millions)",
                    "type": "quantitative",
                    "title": "Users (Millions)"
                }
            ]
        }

    };

    // Embed the Vega-Lite chart
    vegaEmbed("#spotifyUsersChart", yourVlSpec);
}

// Call the function to load data and create the chart
loadSpotifyUsersChart();

async function loadTopSpotifyGenresChart() {

    const yourVlSpec = {
        "$schema": "https://vega.github.io/schema/vega-lite/v5.json",
        "data": {
            "values": [
                { "Year": 2023, "Genre": "pop", "Rank": 1 },
                { "Year": 2023, "Genre": "world/traditional", "Rank": 2 },
                { "Year": 2023, "Genre": "hip-hop/rap", "Rank": 3 },
                { "Year": 2023, "Genre": "electronic/dance", "Rank": 4 },
                { "Year": 2023, "Genre": "r&b/soul", "Rank": 5 },
                { "Year": 2022, "Genre": "pop", "Rank": 1 },
                { "Year": 2022, "Genre": "hip-hop/rap", "Rank": 2 },
                { "Year": 2022, "Genre": "world/traditional", "Rank": 3 },
                { "Year": 2022, "Genre": "electronic/dance", "Rank": 4 },
                { "Year": 2022, "Genre": "r&b/soul", "Rank": 5 },
                { "Year": 2021, "Genre": "pop", "Rank": 1 },
                { "Year": 2021, "Genre": "hip-hop/rap", "Rank": 2 },
                { "Year": 2021, "Genre": "world/traditional", "Rank": 3 },
                { "Year": 2021, "Genre": "electronic/dance", "Rank": 4 },
                { "Year": 2021, "Genre": "rock", "Rank": 5 },
                { "Year": 2020, "Genre": "pop", "Rank": 1 },
                { "Year": 2020, "Genre": "hip-hop/rap", "Rank": 2 },
                { "Year": 2020, "Genre": "world/traditional", "Rank": 3 },
                { "Year": 2020, "Genre": "electronic/dance", "Rank": 4 },
                { "Year": 2020, "Genre": "r&b/soul", "Rank": 5 },
                { "Year": 2019, "Genre": "pop", "Rank": 1 },
                { "Year": 2019, "Genre": "hip-hop/rap", "Rank": 2 },
                { "Year": 2019, "Genre": "world/traditional", "Rank": 3 },
                { "Year": 2019, "Genre": "electronic/dance", "Rank": 4 },
                { "Year": 2019, "Genre": "r&b/soul", "Rank": 5 },
                { "Year": 2018, "Genre": "hip-hop/rap", "Rank": 1 },
                { "Year": 2018, "Genre": "pop", "Rank": 2 },
                { "Year": 2018, "Genre": "world/traditional", "Rank": 3 },
                { "Year": 2018, "Genre": "electronic/dance", "Rank": 4 },
                { "Year": 2018, "Genre": "rock", "Rank": 5 },
                { "Year": 2017, "Genre": "pop", "Rank": 1 },
                { "Year": 2017, "Genre": "hip-hop/rap", "Rank": 2 },
                { "Year": 2017, "Genre": "world/traditional", "Rank": 3 },
                { "Year": 2017, "Genre": "electronic/dance", "Rank": 4 },
                { "Year": 2017, "Genre": "r&b/soul", "Rank": 5 },
                { "Year": 2016, "Genre": "pop", "Rank": 1 },
                { "Year": 2016, "Genre": "hip-hop/rap", "Rank": 2 },
                { "Year": 2016, "Genre": "world/traditional", "Rank": 3 },
                { "Year": 2016, "Genre": "electronic/dance", "Rank": 4 },
                { "Year": 2016, "Genre": "r&b/soul", "Rank": 5 },
                { "Year": 2015, "Genre": "pop", "Rank": 1 },
                { "Year": 2015, "Genre": "hip-hop/rap", "Rank": 2 },
                { "Year": 2015, "Genre": "world/traditional", "Rank": 3 },
                { "Year": 2015, "Genre": "rock", "Rank": 4 },
                { "Year": 2015, "Genre": "electronic/dance", "Rank": 5 },
                { "Year": 2014, "Genre": "pop", "Rank": 1 },
                { "Year": 2014, "Genre": "world/traditional", "Rank": 2 },
                { "Year": 2014, "Genre": "hip-hop/rap", "Rank": 3 },
                { "Year": 2014, "Genre": "electronic/dance", "Rank": 4 },
                { "Year": 2014, "Genre": "rock", "Rank": 5 }
            ]
        },
        "layer": [
            {
                "mark": "line",
                "encoding": {
                    "x": {
                        "field": "Year",
                        "type": "ordinal",
                        "title": "Year"
                    },
                    "y": {
                        "field": "Rank",
                        "type": "ordinal",
                        "title": "Rank",
                        "sort": ["1", "2", "3", "4", "5"]
                    },
                    "color": {
                        "field": "Genre",
                        "type": "nominal",
                        "legend": null
                    }
                }
            },
            {
                "mark": { "type": "point", "filled": true, "size": 50 },
                "encoding": {
                    "x": {
                        "field": "Year",
                        "type": "ordinal",
                        "axis": {
                            "labelAngle": 0,
                            "labelFontSize": 12,
                            "ticks": true,
                            "labelPadding": 10,
                            "labelOffset": 13
                        }
                    },
                    "y": {
                        "field": "Rank",
                        "type": "ordinal"
                    },
                    "color": { "field": "Genre", "type": "nominal", "legend": null },
                    "tooltip": [
                        { "field": "Year", "type": "ordinal", "title": "Year" },
                        { "field": "Genre", "type": "nominal", "title": "Genre" },
                        { "field": "Rank", "type": "ordinal", "title": "Rank" }
                    ]
                }
            },
            {
                "mark": { "type": "text", "align": "left", "dx": 10 },
                "transform": [{ "filter": { "field": "Year", "equal": 2023 } }],
                "encoding": {
                    "x": { "field": "Year", "type": "ordinal" },
                    "y": { "field": "Rank", "type": "ordinal" },
                    "text": { "field": "Genre" },
                    "color": { "field": "Genre", "type": "nominal", "legend": null }
                }
            }
        ],
        "title": {
            "text": "Trends of Top 5 Spotify Genres (2014-2023)",
            "fontSize": 20,
            "fontWeight": "bold"
        },
        "config": {
            "view": {
                "width": 600,
                "height": 350,
                "stroke": null
            }
        }
    };
    vegaEmbed("#topSpotifyGenresChart", yourVlSpec);
}

loadTopSpotifyGenresChart();

// colour lightener https://mdigi.tools/lighten-color/#ffa07a

// Function to load data and create the charts
async function loadSpotifyUserGenreChart() {
    // Data for 2013
    const data2013 = [
        { "Age Group": "Millennials", "Top Music Genres": "Pop", "Percentage": 35 },
        { "Age Group": "Millennials", "Top Music Genres": "Hip-Hop/Rap", "Percentage": 25 },
        { "Age Group": "Millennials", "Top Music Genres": "R&B", "Percentage": 20 },
        { "Age Group": "Millennials", "Top Music Genres": "K-Pop/J-Pop", "Percentage": 5 },
        { "Age Group": "Millennials", "Top Music Genres": "Regional Mexican, Bollywood, Spanish Contemporary", "Percentage": 10 },
        { "Age Group": "Millennials", "Top Music Genres": "Other Genres (Latin, EDM, etc.)", "Percentage": 5 },
        { "Age Group": "Gen Z", "Top Music Genres": "Pop", "Percentage": 40 },
        { "Age Group": "Gen Z", "Top Music Genres": "Hip-Hop/Rap", "Percentage": 25 },
        { "Age Group": "Gen Z", "Top Music Genres": "Electronic", "Percentage": 10 },
        { "Age Group": "Gen Z", "Top Music Genres": "Indie/Alternative", "Percentage": 15 },
        { "Age Group": "Gen Z", "Top Music Genres": "Other genres (Latin, EDM, etc.)", "Percentage": 10 }
    ];

    // Data for 2023
    const data2023 = [
        { "Age Group": "Millennials", "Top Music Genres": "Pop", "Percentage": 40 },
        { "Age Group": "Millennials", "Top Music Genres": "Hip-Hop/Rap", "Percentage": 30 },
        { "Age Group": "Millennials", "Top Music Genres": "Rock", "Percentage": 15 },
        { "Age Group": "Millennials", "Top Music Genres": "Indie/Alternative", "Percentage": 10 },
        { "Age Group": "Millennials", "Top Music Genres": "Other genres (Latin, EDM, etc.)", "Percentage": 5 },
        { "Age Group": "Gen Z", "Top Music Genres": "Pop", "Percentage": 40 },
        { "Age Group": "Gen Z", "Top Music Genres": "Afrobeats", "Percentage": 25 },
        { "Age Group": "Gen Z", "Top Music Genres": "Alternative/Indie", "Percentage": 20 },
        { "Age Group": "Gen Z", "Top Music Genres": "Hip-Hop/Rap", "Percentage": 10 },
        { "Age Group": "Gen Z", "Top Music Genres": "Other genres (Latin, EDM, etc.)", "Percentage": 5 }
    ];

    // Custom colors
    const colors = {
        "Pop": "#4C78A8",
        "Hip-Hop/Rap": "#F58518",
        // colour lightener https://mdigi.tools/lighten-color/#ffa07a
        "R&B": "#f4bcbb",
        "K-Pop/J-Pop": "#c7e2e0",
        "Regional Mexican, Bollywood, Spanish Contemporary": "#b8dcb4",
        "Other Genres (Latin, EDM, etc.)": "#f8eab1",
        "Electronic": "#e0c9da",
        "Indie/Alternative": "#ffd8db",
        "Rock": "#d8c8be",
        "Afrobeats": "#e3dfde",
        "Alternative/Indie": "#ffd9ca"
    };

    // Vega-Lite specification for the pie chart for 2013
    const vlSpec2013 = {
        $schema: "https://vega.github.io/schema/vega-lite/v5.json",
        description: "Pie chart showing Spotify top music genres by age group in 2013.",
        width: 600,
        height: 600,
        data: { values: data2013 },
        mark: { type: "arc", tooltip: true },
        encoding: {
            theta: { field: "Percentage", type: "quantitative" },
            color: {
                field: "Top Music Genres",
                type: "nominal",
                legend: { title: "Top Music Genres" },
                scale: { domain: Object.keys(colors), range: Object.values(colors) }
            },
            tooltip: [
                { field: "Age Group", type: "nominal", title: "Age Group" },
                { field: "Top Music Genres", type: "nominal", title: "Top Music Genres" },
                { field: "Percentage", type: "quantitative", title: "Percentage (%)" }
            ]
        },
        view: { stroke: null },
        title: "Spotify Top Music Genres by Age Group (2013)"
    };

    // Vega-Lite specification for the pie chart for 2023
    const vlSpec2023 = {
        $schema: "https://vega.github.io/schema/vega-lite/v5.json",
        description: "Pie chart showing Spotify top music genres by age group in 2023.",
        width: 600,
        height: 600,
        data: { values: data2023 },
        mark: { type: "arc", tooltip: true },
        encoding: {
            theta: { field: "Percentage", type: "quantitative" },
            color: {
                field: "Top Music Genres",
                type: "nominal",
                legend: { title: "Top Music Genres" },
                scale: { domain: Object.keys(colors), range: Object.values(colors) }
            },
            detail: { field: "Age Group" }, 
            tooltip: [
                { field: "Year", type: "ordinal", title: "Year" }, 
                { field: "Age Group", type: "nominal", title: "Age Group" }, 
                { field: "Top Music Genres", type: "nominal", title: "Top Music Genres" }, 
                { field: "Percentage", type: "quantitative", title: "Percentage (%)" }]
        }, transform: [
            { aggregate: [{ 
                op: "sum", field: "Percentage", as: "Percentage" }], 
                groupby: ["Year", "Top Music Genres", "Age Group"] }], 
                view: { stroke: null }, title
    };

    // Embed the Vega-Lite charts
    vegaEmbed('#spotify2013GenreChart', vlSpec2013);
    vegaEmbed('#spotify2023GenreChart', vlSpec2023);
}

// Call the function to create the charts
loadSpotifyUserGenreChart();

// Function to load data and create the chart
async function loadSpotifyUserGenreChart() {
    // Data for 2013 and 2023 combined
    const data = [
        { "Year": "2013", "Age Group": "Millennials", "Top Music Genres": "Pop", "Percentage": 35 },
        { "Year": "2013", "Age Group": "Millennials", "Top Music Genres": "Hip-Hop/Rap", "Percentage": 25 },
        { "Year": "2013", "Age Group": "Millennials", "Top Music Genres": "R&B", "Percentage": 20 },
        { "Year": "2013", "Age Group": "Millennials", "Top Music Genres": "K-Pop/J-Pop", "Percentage": 5 },
        { "Year": "2013", "Age Group": "Millennials", "Top Music Genres": "Regional Mexican, Bollywood, Spanish Contemporary", "Percentage": 10 },
        { "Year": "2013", "Age Group": "Millennials", "Top Music Genres": "Other Genres (Latin, EDM, etc.)", "Percentage": 5 },
        { "Year": "2013", "Age Group": "Gen Z", "Top Music Genres": "Pop", "Percentage": 40 },
        { "Year": "2013", "Age Group": "Gen Z", "Top Music Genres": "Hip-Hop/Rap", "Percentage": 25 },
        { "Year": "2013", "Age Group": "Gen Z", "Top Music Genres": "Electronic", "Percentage": 10 },
        { "Year": "2013", "Age Group": "Gen Z", "Top Music Genres": "Indie/Alternative", "Percentage": 15 },
        { "Year": "2013", "Age Group": "Gen Z", "Top Music Genres": "Other genres (Latin, EDM, etc.)", "Percentage": 10 },
        { "Year": "2023", "Age Group": "Millennials", "Top Music Genres": "Pop", "Percentage": 40 },
        { "Year": "2023", "Age Group": "Millennials", "Top Music Genres": "Hip-Hop/Rap", "Percentage": 30 },
        { "Year": "2023", "Age Group": "Millennials", "Top Music Genres": "Rock", "Percentage": 15 },
        { "Year": "2023", "Age Group": "Millennials", "Top Music Genres": "Indie/Alternative", "Percentage": 10 },
        { "Year": "2023", "Age Group": "Millennials", "Top Music Genres": "Other genres (Latin, EDM, etc.)", "Percentage": 5 },
        { "Year": "2023", "Age Group": "Gen Z", "Top Music Genres": "Pop", "Percentage": 40 },
        { "Year": "2023", "Age Group": "Gen Z", "Top Music Genres": "Afrobeats", "Percentage": 25 },
        { "Year": "2023", "Age Group": "Gen Z", "Top Music Genres": "Alternative/Indie", "Percentage": 20 },
        { "Year": "2023", "Age Group": "Gen Z", "Top Music Genres": "Hip-Hop/Rap", "Percentage": 10 },
        { "Year": "2023", "Age Group": "Gen Z", "Top Music Genres": "Other genres (Latin, EDM, etc.)", "Percentage": 5 }
    ];

    // Custom colors
    const colors = {
        "Pop": "#4C78A8",
        "Hip-Hop/Rap": "#F58518",
        "R&B": "#f4bcbb",
        "K-Pop/J-Pop": "#c7e2e0",
        "Regional Mexican, Bollywood, Spanish Contemporary": "#b8dcb4",
        "Other Genres (Latin, EDM, etc.)": "#f8eab1",
        "Electronic": "#e0c9da",
        "Indie/Alternative": "#ffd8db",
        "Rock": "#d8c8be",
        "Afrobeats": "#e3dfde",
        "Alternative/Indie": "#ffd9ca"
    };

    // Custom tooltip data for the specific point
    const customTooltipData = [
        { "Year": "2023", "Age Group": "Millennials & Gen Z", "Top Music Genres": "Pop", "Percentage": 40 }
    ];

    // Combine the main data with the custom tooltip data
    const combinedData = data.concat(customTooltipData);

    // Vega-Lite specification for the line chart
    const vlSpec = {
        $schema: "https://vega.github.io/schema/vega-lite/v5.json",
        description: "Line chart showing Spotify top music genres by age group in 2013 and 2023.",
        width: 600,
        height: 400,
        data: { values: combinedData },
        layer: [
            {
                mark: "line",
                encoding: {
                    x: {
                        field: "Year",
                        type: "ordinal",
                        title: "Year",
                        axis: { labelAngle: 0 }  // Rotate labels to 0 degrees for horizontal alignment
                    },
                    y: { field: "Percentage", type: "quantitative", title: "Percentage (%)" },
                    color: {
                        field: "Top Music Genres",
                        type: "nominal",
                        legend: { title: "Top Music Genres" },
                        scale: { domain: Object.keys(colors), range: Object.values(colors) }
                    },
                    detail: { field: "Age Group" }
                }
            },
            {
                mark: "point",
                encoding: {
                    x: {
                        field: "Year",
                        type: "ordinal"
                    },
                    y: { field: "Percentage", type: "quantitative" },
                    color: {
                        field: "Top Music Genres",
                        type: "nominal",
                        scale: { domain: Object.keys(colors), range: Object.values(colors) }
                    },
                    tooltip: [
                        { field: "Year", type: "ordinal", title: "Year" },
                        { field: "Age Group", type: "nominal", title: "Age Group" },
                        { field: "Top Music Genres", type: "nominal", title: "Top Music Genres" },
                        { field: "Percentage", type: "quantitative", title: "Percentage (%)" }
                    ]
                }
            }
        ],
        view: { stroke: null },
        title: "Spotify Top Music Genres by Age Group (2013 vs. 2023)"
    };

    // Embed the Vega-Lite chart
    vegaEmbed('#spotifyUserGenreChart', vlSpec);
}

// Call the function to create the chart
loadSpotifyUserGenreChart();



// From W3Schools
// MY SLIDES CODE ========================================================================================================

let slideIndex = 1;
showSlides(slideIndex);

// Next/previous controls
function plusSlides(n) {
    showSlides(slideIndex += n);
}

// Thumbnail image controls
function currentSlide(n) {
    showSlides(slideIndex = n);
}

function showSlides(n) {
    let i;
    let slides = document.getElementsByClassName("mySlides");
    let dots = document.getElementsByClassName("dot");
    if (n > slides.length) { slideIndex = 1 }
    if (n < 1) { slideIndex = slides.length }
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
    }
    slides[slideIndex - 1].style.display = "block";
    dots[slideIndex - 1].className += " active";
}