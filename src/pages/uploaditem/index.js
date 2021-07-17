import { Backbar, BottomNavbar, ItemForm } from "../../components";
const UploadItem = () => {
    return (
        <div className="h-screen xl:fixed w-full">
            <Backbar link="/" />
            <ItemForm />
            <BottomNavbar/>
        </div>
    );
}

export default UploadItem;