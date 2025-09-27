const reminderForm = document.getElementById("reminderForm");
const reminderList = document.getElementById("reminderList");

let reminders = JSON.parse(localStorage.getItem("reminders")) || [];

// save the reminders
function saveReminders() {
  localStorage.setItem("reminders", JSON.stringify(reminders));
}

// render the reminders
function renderReminders() {
  reminderList.innerHTML = "";
  reminders.forEach((reminder, index) => {
    const li = document.createElement("li");
    li.innerHTML = `
            <span>${reminder.title}</span>
            <small>${new Date(reminder.time).toLocaleString()}</small>
            <button class="delete-btn" onclick="deleteReminder(${index})">Delete</button>    
        `;
    reminderList.appendChild(li);
  });
}

// Delete a reminder
function deleteReminder(index) {
  reminders.splice(index, 1);
  saveReminders();
  renderReminders();
}

// Add a new reminder

reminderForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const title = document.getElementById("title").value;
  const time = document.getElementById("time").value;

  if (!title || !time) return;

  const newReminder = { title, time };
  reminders.push(newReminder);
  saveReminders();
  renderReminders();

  reminderForm.reset();
});

setInterval(() => {
    const now = new Date().getTime();

    reminders.forEach((reminder, index) => {
        const reminderTime = new Date(reminder.time).getTime()
        
        if(reminderTime <= now) {
            alert(`Reminder: ${reminder.title}`)
            deleteReminder(index)
        }
    })
}, 1000)

// initial render
renderReminders()
