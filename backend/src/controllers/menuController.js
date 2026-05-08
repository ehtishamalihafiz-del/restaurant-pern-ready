const supabase = require('../config/supabase');

exports.getCategories = async (req, res, next) => {
  try {
    const { data, error } = await supabase
      .from('menu_categories')
      .select('*')
      .order('name', { ascending: true });

    if (error) throw error;
    res.json(data);
  } catch (error) {
    next(error);
  }
};

exports.getMenuItems = async (req, res, next) => {
  try {
    const { data, error } = await supabase
      .from('menu_items')
      .select('*, menu_categories(name)')
      .order('created_at', { ascending: false });

    if (error) throw error;
    res.json(data);
  } catch (error) {
    next(error);
  }
};
