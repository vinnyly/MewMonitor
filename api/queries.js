const fs = require('fs');
const path = require('path');

const SQL_PATH = path.join(__dirname, 'sql');
const read = (relPath) => fs.readFileSync(path.join(SQL_PATH, relPath), 'utf8');

module.exports = {
  // Complex reads - check if folder name has (READS) suffix or just 'complex_queries'
  avgNutritionQuery: read('complex_queries/average_daily_nutritional_intake.sql'),
  diagnosisPlanQuery: read('complex_queries/cat_diagnosis_plan.sql'),
  conditionsByAgeQuery: read('complex_queries/conditions_by_age.sql'),
  popularFoodQuery: read('complex_queries/popular_food_for_condition.sql'),

  // User
  createUserQuery: read('user/create_user.sql'),
  deleteUserQuery: read('user/delete_user.sql'),
  readUserProfileQuery: read('user/read_user_profile.sql'),
  updateUserQuery: read('user/update_user.sql'),
  loginQuery: read('user/read_login.sql'),

  // Cat
  createCatQuery: read('cat/create_cat.sql'),
  deleteCatQuery: read('cat/delete_cat.sql'),
  readCatQuery: read('cat/read_cat.sql'),
  readUserCatsQuery: read('cat/read_user_cats.sql'),
  updateCatQuery: read('cat/update_cat.sql'),

  // Diet Plan
  createDietPlanQuery: read('diet_plan/create_diet_plan.sql'),
  deleteDietPlanQuery: read('diet_plan/delete_diet_plan.sql'),
  readAllDietPlansQuery: read('diet_plan/read_all_diet_plans.sql'),
  readDietPlanQuery: read('diet_plan/read_diet_plan.sql'),
  updateDietPlanQuery: read('diet_plan/update_diet.sql'),

  // Food
  createFoodQuery: read('food/create_food.sql'),
  deleteFoodQuery: read('food/delete_food.sql'),
  readFoodIdQuery: read('food/read_food_from_id.sql'),
  readFoodNameQuery: read('food/read_foods_from_name.sql'),
  updateFoodQuery: read('food/update_food.sql'),
  readAllFoodsQuery: read('food/read_all_foods.sql'),

  // Feeds
  createFeedQuery: read('feeds/create_feeds.sql'),
  deleteFeedQuery: read('feeds/delete_feeds.sql'),
  readCatFeedsQuery: read('feeds/read_cat_feeds.sql'),

  // Cat Problems
  createCatProblemQuery: read('cat_problem/create_cat_problem.sql'),
  deleteCatProblemQuery: read('cat_problem/delete_cat_problem.sql'),
  readAllCatProblemsQuery: read('cat_problem/read_all_cat_problems.sql'),
  readCatProblemQuery: read('cat_problem/read_cat_problem.sql'),
  updateCatProblemQuery: read('cat_problem/update_cat_problem.sql'),

  // Diet Plan Foods (Referenced_In)
  addFoodToPlanQuery: read('referenced_in/create_food_to_plan.sql'),
  removeFoodFromPlanQuery: read('referenced_in/delete_reference.sql'),
  readPlanFoodsQuery: read('referenced_in/read_food_plan.sql'),

  // Medicinal Problems
  createMedProblemQuery: read('medicinal_problem/create_med_problem.sql'),
  deleteMedProblemQuery: read('medicinal_problem/delete_med_problem.sql'),
  findMedProblemQuery: read('medicinal_problem/find_med_problem.sql'),
  readMedProblemQuery: read('medicinal_problem/read_med_problem.sql'),
  updateMedProblemQuery: read('medicinal_problem/update_med_problem.sql'),
  readAllMedProblemsQuery: read('medicinal_problem/read_all_med_problems.sql'),

  // Site Manager
  checkSiteManagerQuery: read('site_manager/check_site_manager.sql'),
};
