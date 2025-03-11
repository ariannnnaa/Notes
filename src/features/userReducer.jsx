import { SET_USER, EXIT, ADD_NOTE, CHANGE_NOTE } from "./userActions";

const local = JSON.parse(localStorage.getItem('currentUser'));

export const current = local || {
    user: {
        notes: []
    },
    auth: false,
};

const reducer = (state, action) => {
    const users = JSON.parse(localStorage.getItem('users'));

    switch (action.type) {
 
        case SET_USER:
            localStorage.setItem('currentUser', JSON.stringify({ user: action.payload, auth: true }));

            return {
                user: action.payload,
                auth: true,
            }

            case EXIT:
            localStorage.removeItem('currentUser');

            return {
                user: {},
                auth: false,
            }

 
        case ADD_NOTE: {
            // обновить пользователей 
            const newUsers = users.map((user) => {
                if (user.id === state.user.id) {
                    user.notes = [...user.notes, action.payload];
                    return user
                }
                return user;
            });
            // обновить текущего пользователя 
            const updatedUser = newUsers.find((item) => item.id === state.user.id);
            // сохранить в локальном хранилище
            localStorage.setItem('users', JSON.stringify(newUsers));
            localStorage.setItem('currentUser', JSON.stringify({ ...state, user: updatedUser }))
            return {
                ...state,
                user: updatedUser,
            }
        }

 
        case CHANGE_NOTE: {
            const notes = state.user.notes;
            let updatedNotes = [];
            //    Обновить заметки 
            if (action.payload.operation === 'remove') {
                // удалить  заметку
                updatedNotes = notes.filter((item) => item.id !== action.payload.noteId);

            } else if (action.payload.operation === 'editTitle') {
                // изменить название заметки
                updatedNotes = notes.map((item) => {
                    if (item.id === action.payload.noteId) {
                        item.title = action.payload.title;
                        return item;
                    }
                    return item;
                });

            } else if (action.payload.operation === 'editText') {
                //    изменить текст заметки 
                updatedNotes = notes.map((item) => {
                    if (item.id === action.payload.noteId) {
                        item.text = action.payload.text;
                        return item;
                    }
                    return item;
                });

            }
            // Обновить пользователей 
            const updatedUsers = users.map((user) => {
                if (user.id === state.user.id) {
                    user.notes = updatedNotes;
                    return user;
                }
                return user;
            });
            // Обновить текущего пользователя 
            const updatedUser = updatedUsers.find((item) => item.id === state.user.id);
            //   Сохранить в локальном хранилище 
            localStorage.setItem('users', JSON.stringify(updatedUsers));
            localStorage.setItem('currentUser', JSON.stringify({ ...state, user: updatedUser }));
            return {
                ...state,
                user: updatedUser,
            }
        }
    }
}


export default reducer