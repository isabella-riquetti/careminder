import { supabase } from '../SupabaseClient';
import { Action } from '@careminder/shared/types';

export class ActionDao {
  async create(action: Omit<Action, 'id'>): Promise<Action | null> {
    const { data, error } = await supabase
      .from('actions')
      .insert([action])
      .select();

    if (error) {
      console.error('Error inserting action:', error.message);
      return null;
    }

    return data ? data[0] : null;
  }

  async update(id: number, updatedFields: Partial<Action>): Promise<Action | null> {
    const { data, error } = await supabase
      .from('actions')
      .update(updatedFields)
      .eq('id', id)
      .select();

    if (error) {
      console.error('Error updating action:', error.message);
      return null;
    }

    return data ? data[0] : null;
  }

  async getById(id: number): Promise<Action | null> {
    const { data, error } = await supabase
      .from('actions')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      console.error('Error fetching action by ID:', error.message);
      return null;
    }

    return data;
  }

  async getAll(): Promise<Action[]> {
    const { data, error } = await supabase
      .from('actions')
      .select('*')
      .order('id', { ascending: true });

    if (error) {
      console.error('Error fetching actions:', error.message);
      return [];
    }

    return data as Action[];
  }

  async delete(id: number): Promise<boolean> {
    const { error } = await supabase
      .from('actions')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Error deleting action:', error.message);
      return false;
    }

    return true;
  }
}
