import { useRouter } from "next/dist/client/router"
import { useContext } from "react";
import { userContext } from "../../src/context/AuthProvider";
import Router from 'next/router'
import UserProfileScreen from "../../src/screens/UserProfileScreen";

export default function Com ()
{
    const router = useRouter();
    const {user, setUser} = useContext(userContext)
    const slug = router.query.slug
    let username;
    if (slug)
        username = slug[0];
    if (slug?.length > 1 && user.user)
        Router.push(`/user/${user.user}`)
    if (username)
    return <div><UserProfileScreen user={username}></UserProfileScreen></div>
        return <div></div>
}