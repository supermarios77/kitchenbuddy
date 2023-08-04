import 'dotenv/config';
import express from 'express';
import axios from 'axios';
import cors from 'cors';


const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.post('/', async (req, res) => {
  const { includeIngredients, excludeIngredients, cuisine } = req.body;

  try {
    const apiKey = process.env.API_KEY;
    const url = `https://api.spoonacular.com/recipes/findByIngredients?apiKey=${apiKey}&ingredients=${includeIngredients}&excludeIngredients=${excludeIngredients}&cuisine=${cuisine}`;
    const response = await axios.get(url);

    const recipeIds = response.data.map((recipe) => recipe.id);

    const bulkUrl = `https://api.spoonacular.com/recipes/informationBulk?apiKey=${apiKey}&ids=${recipeIds.join(',')}`;
    const bulkResponse = await axios.get(bulkUrl);

    res.json(bulkResponse.data);
  } catch (error) {
    console.error('Error fetching recipes:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

app.get('/recipes/:recipeId', async (req, res) => {
  const { recipeId } = req.params;

  try {
    const apiKey = process.env.API_KEY;
    const url = `https://api.spoonacular.com/recipes/${recipeId}/information?apiKey=${apiKey}`;
    const response = await axios.get(url);

    res.json(response.data);
  } catch (error) {
    console.error('Error fetching recipe:', error);
    res.status(500).json({ error: 'Server error' });
  }
});



app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

