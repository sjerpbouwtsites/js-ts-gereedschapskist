/**
 * This script will capture all events in the DOM by overriding the Event Listener. 
 * Prints a table with all events to the top of the page.
 * based on: https://css-tricks.com/capturing-all-events/
 */

// Event statistics
var listenerCount = {};
var eventCount = {};

if (!document.getElementById('events-table')) {
  const eventsTable = document.createElement('table');
  eventsTable.setAttribute('id', 'events-stats');
  eventsTable.className = 'events-stats';
  document.getElementsByTagName('body')[0].appendChild(eventsTable);
}
if (!document.getElementById('events-table-styles')){
  const eventsTableStyles = document.createElement('style');
  eventsTableStyles.setAttribute('id', 'event-table-styles')
  eventsTableStyles.innerHTML = `
    .events-stats {
      position: absolute;
      top: 0;
      left: 0;
      z-index: 99999999;
    }
  
  `;
  document.head.appendChild(eventsTableStyles)
}

function renderTable() {
  let tableRows = '';
  for (var name in listenerCount) {
    tableRows += '<tr><td>' + name + '</td><td>' + listenerCount[name] + '</td><td data-name="' + name + '">' + (eventCount[name] || 0) + '</td></tr>';
  }
  document.getElementById('events-stats').innerHTML = `
  <tr><th>Event Name</th><th># Listeners</th><th># Handlers Called</th></tr>
  ${tableRows}  
  `;
}

function updateTable(eventName) {
  document.querySelector('td[data-name=' + eventName + ']').innerHTML =eventCount[eventName] || 0;
}

function overwriteEventListener(){
// Override for adding event listeners
var oldAddEventListener = EventTarget.prototype.addEventListener;
EventTarget.prototype.addEventListener = function(eventName, eventHandler)
{
  listenerCount[eventName] = (listenerCount[eventName] || 0) + 1;
  renderTable();
  
  oldAddEventListener.call(this, eventName, function(event) {
    eventCount[eventName] = (eventCount[eventName] || 0) + 1;
    updateTable(eventName);
    if (typeof eventHandler === 'function' && eventHandler.prototype.hasOwnProperty('call')){
      eventHandler(event);
    } 
  });
};  
}

overwriteEventListener();