import supabase from "./supabase";

export async function getSettings() {
  const { data: sesssion } = await supabase.auth.getSession();
  if (!sesssion.session) return null;

  const { data: user, error: usererror } = await supabase.auth.getUser();

  let { data, error } = await supabase
    .from("settings")
    .select("*")
    .eq("user_id", user.user.id)
    .single();

  if (data === null) {
    const { data: settingsData, error: settingsError } = await supabase
      .from("settings")
      .insert([
        {
          min_booking_length: 10,
          max_booking_length: 10,
          breakfast_price: 100,
          max_guests_booking: 5,
          user_id: user.user.id,
        },
      ])
      .select();
  }

  if (error) {
    console.error(error);
    throw new Error("Settings could not be loaded");
  }

  return data;
}

// We expect a newSetting object that looks like {setting: newValue}
export async function updateSetting(newSetting) {
  const { data: sesssion } = await supabase.auth.getSession();
  if (!sesssion.session) return null;

  const { data: user, error: usererror } = await supabase.auth.getUser();

  const { data, error } = await supabase
    .from("settings")
    .update(newSetting)
    // There is only ONE row of settings, and it has the ID=1, and so this is the updated one
    .eq("user_id", user.user.id)
    .single();

  if (error) {
    console.error(error);
    throw new Error("Settings could not be updated");
  }
  return data;
}
