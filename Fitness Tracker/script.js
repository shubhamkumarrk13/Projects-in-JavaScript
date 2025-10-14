document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("workout-form");
  const workoutList = document.getElementById("workout-list");
  const totalCaloriesSpan = document.getElementById("total-calories");

  const STORAGE_KEY = "fitnessWorkouts";

  let workouts = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];

  const saveWorkouts = () => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(workouts));
  };

  const updateSummary = () => {
    const totalCalories = workouts.reduce(
      (sum, workout) => sum + workout.calories,
      0
    );

    totalCaloriesSpan.textContent = totalCalories;
  };

  const renderWorkouts = () => {
    workoutList.innerHTML = "";

    workouts.forEach((workout, index) => {
      const listItem = document.createElement("li");
      listItem.innerHTML = `
                <span>
                    <strong>${workout.name}</strong> - ${workout.calories} kcal on ${workout.date}
                </span>
                <button class="delete-btn" data-index="${index}" >Delete</button>
            `;
      workoutList.appendChild(listItem);
    });

    updateSummary();
  };

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const nameInput = document.getElementById("workout-name");
    const caloriesInput = document.getElementById("calories-burned");
    const dateInput = document.getElementById("workout-date");

    const newWorkout = {
      name: nameInput.value,
      calories: parseInt(caloriesInput.value),
      date: dateInput.value,
    };

    workouts.push(newWorkout);
    saveWorkouts();
    renderWorkouts();

    form.reset();
  });

  workoutList.addEventListener("click", (e) => {
    if (e.target.classList.contains("delete-btn")) {
      const indexToDelete = e.target.getAttribute("data-index");

      workouts.splice(indexToDelete, 1);

      saveWorkouts();
      renderWorkouts();
    }
  });

  renderWorkouts();
});
