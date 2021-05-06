var svg = d3.select('svg');
var chart = svg.append('g');
var grades = ["A","B","C","D","F"]

var data = [];

const margin = 50;
const width = 800;
const height = 500;
const chartWidth = width - 2 * margin;
const chartHeight = height - 2 * margin;

function makeChart(marks) {

    $("svg").remove();

    createMap(marks);

    const colourScale = d3.scaleLinear()
                            .domain([978, 2188])
                            .range(['red', 'blue']);

    const xScale = d3.scaleBand() // discrete, bucket
                    .domain(data.map((dat) => dat.mark))
                    .range([0, chartWidth])
                    .padding(0.3);

    const yScale = d3.scaleLinear()
                    .domain([0, 1.0])
                    .range([chartHeight, 0]);

    let svg = d3.select('body')
                    .append('svg')
                    .attr('width', width)
                    .attr('height', height);

    // title
    svg.append('text')
            .attr('x', width / 2)
            .attr('y', margin)
            .attr('text-anchor', 'middle')
            .text('Grade Distribution');

    // create a group (g) for the bars
    let g = svg.append('g')
                    .attr('transform', `translate(${margin}, ${margin})`);

    // y-axis
    g.append('g')
        .call(d3.axisLeft(yScale));
    
    // x-axis
    g.append('g')
        .attr('transform', `translate(0, ${chartHeight})`)
        .call(d3.axisBottom(xScale));

    let rectangles = g.selectAll('rect')
    .data(data)
    .enter()
        .append('rect')
            .attr('x', (data) => xScale(data.mark))
            .attr('y', (data) => chartHeight)
            .attr('width', xScale.bandwidth())
            .attr('height', (data) => 0)
            .attr('fill', (data) => colourScale(data.freq))
            .on('mouseenter', function(source, index) {
                d3.select(this)
                    .transition()
                    .duration(200)
                    .attr('opacity', 0.5);
            })
            .on('mouseleave', function(source, index) {
                d3.select(this)
                    .transition()
                    .duration(200)
                    .attr('opacity', 1.0);
            });
    
    rectangles.transition()
        .ease(d3.easeElastic)
        .attr('height', (data) => chartHeight - yScale(data.freq))
        .attr('y', (data) => yScale(data.freq))
        .duration(1000)
        .delay((data, index) => index * 50);
}

function createMap(marks) {
    data = [];
    var aCount = 0;
    var bCount = 0;
    var cCount = 0;
    var dCount = 0;
    var fCount = 0;

    marks.forEach(mark => {
        letterGrade = getGrade(mark);
        if(letterGrade == 'A'){
            aCount++;
        } else if (letterGrade == 'B'){
            bCount++;
        } else if (letterGrade == 'C'){
            cCount++;
        } else if (letterGrade == 'D'){
            dCount++;
        } else if (letterGrade == 'F'){
            fCount++;
        }
    });

    data = [{"mark": 'A', "freq": (aCount/marks.length)},
            {"mark": 'B', "freq": (bCount/marks.length)},
            {"mark": 'C', "freq": (cCount/marks.length)},
            {"mark": 'D', "freq": (dCount/marks.length)},
            {"mark": 'F', "freq": (fCount/marks.length)},]
}

function getGrade(mark) {

    if(mark > 10){
        mark = mark * 0.1
    }

    if (mark < 5.0) {
        return 'F';
    } else if (mark < 6.0) {
        return 'D';
    } else if (mark < 7.0) {
        return 'C';
    } else if (mark < 8.0) {
        return 'B';
    } else {
        return 'A';
    }
}
