import { useState } from 'react';

export default function IndexRoute() {
    const [grid, setGrid] = useState({ resx: 0, resy: 0, top: 0, bottom: 0, left: 0, right: 0, maxHeight: 0, maxWidth: 0 });

    function calcRatio() {
        updateGrid();//update grid numbers from form

        //calculate
        var ratio = grid.resx / grid.resy;
        var centerX = (grid.left + grid.right) / 2;
        var centerY = (grid.top + grid.bottom) / 2;
        centerX = (centerX * 152) / grid.maxWidth;
        centerY = ((centerY * 152) / grid.maxHeight) / ratio;

        var width = grid.right - grid.left;
        var height = grid.bottom - grid.top;
        width = (width * 152) / grid.maxWidth;
        height = width / ratio;
        
        console.log('Ratio: ' + centerX + ', ' + centerY + ', ' + width + ', ' + height + ', ' + ratio);
        var results = document.getElementById('results');
        results.innerHTML = "<p>Round up or down as you see fit.<br />X Offset: " + centerX.toFixed(2) + ", Y Offset: " + centerY.toFixed(2) + "</p><p>Ratio: " + ratio.toFixed(3) + "</p><p>Width: " + width.toFixed(2) + ", Height: " + height.toFixed(2) + "</p>";
    }

    function calcStandard() {
        updateGrid();//update grid numbers from form

        //calculate
        var ratio = grid.resx / grid.resy;
        var centerX = (grid.left + grid.right) / 2;
        var centerY = (grid.top + grid.bottom) / 2;
        centerX = (centerX * 152) / grid.maxWidth;
        centerY = (centerY * 152) / grid.maxHeight;

        var height = grid.bottom - grid.top;
        var width = grid.right - grid.left;
        height = (height * 152) / grid.maxHeight;
        width = (width * 152) / grid.maxWidth;

        console.log('Non-Ratio: ' + centerX + ', ' + centerY + ', ' + width + ', ' + height);
        var results = document.getElementById('results');
        results.innerHTML = "<p>Round up or down as you see fit.<br />X Offset: " + centerX.toFixed(2) + ", Y Offset: " + centerY.toFixed(2) + "</p><p>Width: " + width.toFixed(2) + ", Height: " + height.toFixed(2) + "</p>";
    }

    function updateGrid() {//update grid state and then go back to function for calc
        grid.resx = parseInt(document.getElementById('resx').value);
        grid.resy = parseInt(document.getElementById('resy').value);

        grid.maxHeight = parseInt(document.getElementById('bottomMax').value);
        grid.maxWidth = parseInt(document.getElementById('rightMax').value);

        grid.top = parseInt(document.getElementById('top').value);
        grid.bottom = parseInt(document.getElementById('bottom').value);
        grid.left = parseInt(document.getElementById('left').value);
        grid.right = parseInt(document.getElementById('right').value);
    }

    return (
        <section className='h-screen flex flex-col justify-center content-middle max-w-lg mx-auto text-center'>
            <div className='grid grid-cols-4 gap-2 px-5 mx-auto rounded-md bg-gray-800 text-white'>
                <div className='col-span-4'>
                    <a href='/' className='text-blue-300 hover:text-fuchsia-400'><h1 className='text-2xl font-bold'>toLazer!</h1></a>
                </div>
                <h4 className='col-span-4 text-lg font-bold'>Resolution(px)</h4>
                <label className='text-right'>Width:</label>
                <input className='text-black' id="resx" type="text" size='6' />
                <label className='text-right'>Height:</label>
                <input className='text-black' id="resy" type="text" size='6' />

                <h4 className='col-span-4 text-lg font-bold'>Coordinates Range(counts)</h4>
                <p className='col-span-4'>Need full tablet bottom and right values for proper scaling. Assuming 0-X range. Make sure to write down your current settings incase &lt;3</p>
                <label className='text-right'>Bottom 'Max':</label>
                <input className='text-black' id="bottomMax" type="text" size='8' />
                <label className='text-right'>Right 'Max':</label>
                <input className='text-black' id="rightMax" type="text" size='8' />

                <h4 className='col-span-4 text-lg font-bold'>Coordinates(counts)</h4>
                <label className='text-right'>Top:</label>
                <input className='text-black' id="top" type="text" size='6' />
                <label className='text-right'>Bottom:</label>
                <input className='text-black' id="bottom" type="text" size='6' />
                <label className='text-right'>Left:</label>
                <input className='text-black' id="left" type="text" size='6' />
                <label className='text-right'>Right:</label>
                <input className='text-black' id="right" type="text" size='6' />

                <label className='col-span-4'>Force Proportions</label>
                <div className='col-span-4 flex justify-center'>
                    <button className="m-3 px-5 py-1 rounded-sm bg-fuchsia-400" onClick={calcRatio}>Yes</button>
                    <button className="m-3 px-5 py-1 rounded-sm bg-fuchsia-400" onClick={calcStandard}>No</button>
                </div>
            </div>
            <div id="results"></div>
        </section>
    );
}
