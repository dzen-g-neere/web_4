
function downloadPoints (){

    return  fetch('/api/points', {
        method: 'GET'
    });
}
export default downloadPoints;