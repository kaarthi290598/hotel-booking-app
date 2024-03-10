import supabase, { supabaseUrl } from "./supabase";

export async function getCabins() {
  const { data: cabins, error } = await supabase.from("cabins").select("*");

  if (error) {
    throw new Error(`Failed to fetch cabins: ${error}`);
  }
  return cabins;
}

export async function deleteCabin(id) {
  const { error } = await supabase.from("cabins").delete().eq("id", id);
  if (error) {
    console.error(error);
    throw new Error(`Failed to delete cabin with id=${id}: ${error}`);
  }
}

export async function addEditCabin(newCabin, id) {
  //https://inaqybyfmfgixgowrqnp.supabase.co/storage/v1/object/public/cabin_images/cabin-001.jpg
  //create cabin
  const hasCabinPath = newCabin.image?.startsWith?.(supabaseUrl);

  const imgName = `${Math.random()}-${newCabin.image.name}`.replace("/", "");

  const imgPath = hasCabinPath
    ? newCabin.image
    : `${supabaseUrl}/storage/v1/object/public/cabin_images/${imgName}`;

  //create Cabins
  let query = supabase.from("cabins");

  if (!id) query = query.insert([{ ...newCabin, image: imgPath }]);

  //edit
  if (id)
    query = query
      .update({ ...newCabin, image: imgPath })
      .eq("id", id)
      .select();

  const { data, error } = await query.select().single();

  if (error) {
    console.error(error);
    throw new Error(`Failed to add cabin ${error}`);
  }

  if (hasCabinPath) return data;
  //  upload image
  const { error: storageError } = await supabase.storage
    .from("cabin_images")
    .upload(imgName, newCabin.image);

  //delete cabin if image not updated
  if (storageError) {
    await supabase.from("cabins").delete().eq("id", data.id);
    console.error(storageError);
    throw new Error(
      `Failed to store image for cabin ${data.id}: ${storageError}`
    );
  }

  return data;
}
