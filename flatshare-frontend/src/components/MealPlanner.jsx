import { useState } from 'react'

export default function MealPlanner() {
  const [meals, setMeals] = useState(() => {
    return JSON.parse(localStorage.getItem("mealPlanner") || "[]")
  })
  const [day, setDay] = useState("")
  const [meal, setMeal] = useState("")
  const [chef, setChef] = useState("")

  const addMeal = () => {
    if (!day || !meal || !chef) return
    const newMeal = { day, meal, chef }
    const updated = [...meals, newMeal]
    setMeals(updated)
    localStorage.setItem("mealPlanner", JSON.stringify(updated))
    setDay("")
    setMeal("")
    setChef("")
  }

  return (
    <div className="p-6 mt-6 border-t bg-white/30 dark:bg-gray-900/40 backdrop-blur-lg rounded-xl shadow-lg">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">🍲 Shared Meal Planner</h2>
      <div className="flex gap-2 mb-4">
        <select
          value={day}
          onChange={(e) => setDay(e.target.value)}
          className="px-3 py-2 rounded-md border"
        >
          <option value="">Day</option>
          <option>Monday</option>
          <option>Tuesday</option>
          <option>Wednesday</option>
          <option>Thursday</option>
          <option>Friday</option>
          <option>Saturday</option>
          <option>Sunday</option>
        </select>
        <input
          type="text"
          placeholder="Meal (e.g. Jollof Rice)"
          value={meal}
          onChange={(e) => setMeal(e.target.value)}
          className="flex-1 px-3 py-2 rounded-md border"
        />
        <input
          type="text"
          placeholder="Chef (roommate)"
          value={chef}
          onChange={(e) => setChef(e.target.value)}
          className="flex-1 px-3 py-2 rounded-md border"
        />
        <button
          onClick={addMeal}
          className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transform transition-transform hover:scale-105 hover:shadow-md transition-colors"
        >
          Add
        </button>
      </div>
      {meals.length > 0 ? (
        <ul className="space-y-2">
          {meals.map((m, i) => (
            <li key={i} className="flex justify-between items-center px-3 py-2 rounded-md bg-white/50 dark:bg-gray-800/50">
              <span>{m.day}: {m.meal} (Chef: {m.chef})</span>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-500">No meals planned yet. Add weekly meals to organize cooking duties.</p>
      )}
    </div>
  )
}
