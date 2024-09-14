import { signIn, useSession } from "next-auth/react"
import { Button } from "../ui";
import { CircleUser, User } from "lucide-react";
import Link from "next/link";

interface Props {
    className?: string;
    onClickSignIn?: () => void;
}

export const ProfileButton: React.FC<Props> = ({ className, onClickSignIn }) => {
    const { data: session } = useSession()
    console.log(session)
    return (
        <div className={className}>
            {
                !session ?
                <Button onClick={onClickSignIn} variant='outline' className='flex items-center gap-1'>
                    <User size={16}/>
                    Log in
                </Button> :
                <Link href="/profile">
                    <Button variant="secondary" className="flex items-center gap-2">
                        <CircleUser size={18} />
                        Profile
                    </Button>
                </Link>
            }
        </div>
    )
}