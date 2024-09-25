import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {axios} from '../../api-client';

export interface Skill {
    id: number;
    name: string;
    description: string;
    proficiency: number;
    icon: string;
}

export interface SkillResponse {
    skills: Skill[];
    status: {is_success:boolean, message: string};
}


interface SkillState {
    skills: Record<number, Skill>;
    loading: 'idle' | 'pending' | 'succeeded' | 'failed';
}


const initialState: SkillState = {
    skills: {},
    loading: 'idle',
} 


export const fetchSkills = createAsyncThunk<SkillResponse|undefined>(
    'skills',
    async () => {
        try {
            const response = await axios.get(`/skill/v1/skills`);
            return response.data;
        } catch (error) {
            console.error(error);
        }
    }
)

const skillsSlice = createSlice({
    name: 'skills',
    initialState,
    reducers: {
        emptySkills(state) {
            state.skills = {};
        }


    },
    extraReducers: (builder) => {
        builder.addCase(fetchSkills.fulfilled, (state, action) => {
            if (state.skills && action.payload) {
                action.payload.skills.forEach((skill) => {
                    state.skills[skill.id] = skill;
                });
                state.loading = 'succeeded';
            }
        })

        .addCase(fetchSkills.pending, (state) => {
            state.loading = 'pending';
        })

        .addCase(fetchSkills.rejected, (state) => {
            state.loading = 'failed';
        })
    },
});


export default skillsSlice.reducer;
export const {emptySkills: emptyPosts} = skillsSlice.actions;