// Populate the DOM with all elements that bmi.ts queries at module load time
document.body.innerHTML = `
  <form id="bmiForm">
    <input id="bmiHeight" type="number" />
    <input id="bmiWeight" type="number" />
    <button id="saveBmiBtn" type="button">Save</button>
  </form>
  <div id="bmiResultCard" style="display:none"></div>
  <div id="bmiValue"></div>
  <div id="bmiCategory"></div>
  <div id="bmiMarker"></div>
  <div id="bmiHeightDisplay"></div>
  <div id="bmiWeightDisplay"></div>
  <table id="bmiHistoryTable"><tbody></tbody></table>
`;
