import { supabase } from '../SupabaseClient';
import { CreateUserAction, UserAction } from '@careminder/shared/types';
import { generateUniqueId } from "@careminder/shared/utils/id";

export class UserActionDao {
  async create(action: CreateUserAction, userId: string): Promise<UserAction | null> {
    const { data, error } = await supabase
      .from('user_actions')
      .insert([{
        ...action,
        user_id: userId,
        group_id: generateUniqueId()
      }])
      .select();

    if (error) {
      console.error('Error inserting action:', error.message);
      return null;
    }

    return data ? data[0] : null;
  }

  async update(id: number, updatedFields: Partial<UserAction>): Promise<UserAction | null> {
    const { data, error } = await supabase
      .from('user_actions')
      .update(updatedFields)
      .eq('id', id)
      .select();

    if (error) {
      console.error('Error updating action:', error.message);
      return null;
    }

    return data ? data[0] : null;
  }

  async getById(id: number): Promise<UserAction | null> {
    const { data, error } = await supabase
      .from('user_actions')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      console.error('Error fetching action by ID:', error.message);
      return null;
    }

    return data;
  }

  async getAllFromUser(user_id: string): Promise<UserAction[]> {
    const { data, error } = await supabase
      .from('user_actions')
      .select('*')
      .eq('user_id', user_id);

    if (error) {
      console.error('Error fetching actions:', error.message);
      return [];
    }

    return data as UserAction[];
  }

  async delete(id: number): Promise<boolean> {
    const { error } = await supabase
      .from('user_actions')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Error deleting action:', error.message);
      return false;
    }

    return true;
  }
}