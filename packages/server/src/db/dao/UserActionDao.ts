import { supabase } from '../SupabaseClient';
import { CreateUserAction, UserAction, UserActionDisplay } from '@careminder/shared/types';
import { generateUniqueId } from "@careminder/shared/utils/id";

export class UserActionDao {
  async createBatch(actions: CreateUserAction[], userId: string): Promise<UserAction | null> {
    const group_id = generateUniqueId();
    const { data, error } = await supabase
      .from('user_actions')
      .insert(actions.map(a => ({
        ...a,
        user_id: userId,
        group_id
      })))
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

  async getAllFromUser(user_id: string, start: Date, end: Date): Promise<UserActionDisplay[]> {
    const { data, error } = await supabase
      .from('user_actions')
      .select(`
      *,
      actions (
        name,
        category
      )
    `)
      .eq('user_id', user_id)
      .or(
        `and(start_at.gte.${start.toISOString()},start_at.lte.${end.toISOString()}),and(end_at.not.is.null,end_at.gte.${start.toISOString()},end_at.lte.${end.toISOString()})`
      );

    if (error) {
      console.error('Error fetching actions:', error.message);
      return [];
    }

    return data as UserActionDisplay[];
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

  async deleteByGroup(group_id: string): Promise<boolean> {
    const { error } = await supabase
      .from('user_actions')
      .delete()
      .eq('group_id', group_id);

    if (error) {
      console.error('Error deleting action:', error.message);
      return false;
    }

    return true;
  }

  async getRecentUniqueGroupCount(userId: string): Promise<number> {
    const tenMinutesAgo = new Date(Date.now() - 10 * 60 * 1000).toISOString();
  
    const { data, error } = await supabase
      .from('user_actions')
      .select('group_id')
      .eq('user_id', userId)
      .gt('created_at', tenMinutesAgo)
      .neq('group_id', null);
  
    if (error) {
      console.error('Error fetching data:', error);
      return 0;
    }
  
    if (!data) {
      return 0;
    }
  
    const uniqueGroupIds = new Set(data.map((item: { group_id: any }) => item.group_id));
    return uniqueGroupIds.size;
  }
}
