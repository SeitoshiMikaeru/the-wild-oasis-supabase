import supabase, { supabaseUrl } from "./supabase";

export async function getCabins() {
    const { data, error } = await supabase
        .from('cabins')
        .select('*')

    if (error) {
        console.error(error);
        throw new Error ("Cabins could not be loaded");
    }

    return data;
}

export async function deleteCabin(id) {
    const { data, error } = await supabase
        .from('cabins')
        .delete()
        .eq('id', id);

    if (error) {
        console.error(error);
        throw new Error ("Cabins could not be deleted");
    }

    return data;
}

export async function addEditCabin(cabin, id) {
    const hasImagePath = cabin.image?.startsWith?.(supabaseUrl);

    const imageName = `${Math.random()}-${cabin.image?.name}`.replaceAll?.("/", "");
    const imagePath = hasImagePath ? cabin.image : `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;

    let query = supabase.from("cabins");

    // A) Creating a cabin

    if (!id) {
        query = query.insert([
            {
             ...cabin,
             image: imagePath,
            }
         ]);
    }

    // B) Editing a cabin

    if (id) {
        query = query.update({
            ...cabin,
            image: imagePath,
           })
        .eq('id', id);
    }

    // 1. Creating a cabin itself
    const { data, error } = await query.select().single();

    if (error) {
        console.error(error);
        throw new Error ("Cabin could not be added");
    }

    // 2. If successful, we upload the image

    if(hasImagePath) return data;

    const { error: storageError, } = await supabase
        .storage
        .from('cabin-images')
        .upload(imageName, cabin.image);

    // 3. Deleting a cabin in case of an upload error

    if (storageError) {
        await supabase
        .from('cabins')
        .delete()
        .eq('id', data.id);

        console.error(storageError);
        throw new Error ("Cabin image could not be uploaded");
    }

    return data;
}

// https://ywweflbkchgpsmzwpkgc.supabase.co/storage/v1/object/public/cabin-images/cabin-001.jpg