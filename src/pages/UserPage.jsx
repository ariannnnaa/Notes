import { UserPageProvider } from "../context/useSearchContext";
import Notes from "../components/Notes";

const UserPage = () => {

    return (
        <UserPageProvider>
            <Notes />
        </UserPageProvider>
    );
}

export default UserPage;
