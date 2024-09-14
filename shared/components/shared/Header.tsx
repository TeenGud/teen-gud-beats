'use client'
import { cn } from '@/shared/lib/utils';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import { Container } from './Container';
import Image from 'next/image';
import Logo from '../../../public/logo.jpg'
import { AuthModal } from '../ui';
import Link from 'next/link';
import { SearchInput } from './SearchInput';
import { CartButton } from './CartButton';
import { useSearchParams } from 'next/navigation';
import toast from 'react-hot-toast';
import { ProfileButton } from './ProfileButton';

interface Props {
    className?: string;
    hasSearch?: boolean;
    hasCart?: boolean;
}

export const Header: React.FC<Props> = ({className, hasSearch = true, hasCart = true}) => {
  const [openAuthModal, setOpenAuthModal] = useState(false)
  const searchParams = useSearchParams();
  const router = useRouter();
  useEffect(() => {
    if(searchParams.has('paid')) {
        setTimeout(() => {
            toast.success('The order has been successfully paid. Information sent by email.')
        }, 1000)
        router.replace('http://localhost:3000');
    }
    if(searchParams.has('verified')) {
        setTimeout(() => {
            toast.success("You've successfuly verified your account")
        }, 1000)
        router.replace('http://localhost:3000');
    }
  }, [searchParams, router])
  return (
    <header className={cn('border-b', className)}>
        <Container className={cn('flex items-center justify-between py-8')}>
            <Link href="/">
                <div className='flex items-center gap-4'>
                    <Image src={Logo} alt='Logo' width={50} height={50} />
                    <div className=''>
                        <h1 className='text-2xl uppercase font-black'>Teen Gud Beats</h1>
                        <p className='text-sm text-gray-400 leading-3'>beats for you</p>
                    </div>
                </div>
            </Link>

            {hasSearch && <div className='mx-10 flex-1'>
                <SearchInput />
            </div>}

            <div className='flex items-center gap-3'>
                <AuthModal open={openAuthModal} onClose={() => setOpenAuthModal(false)}/>
                <ProfileButton onClickSignIn={() => setOpenAuthModal(true)} />
                {hasCart && <CartButton className={''} />}
            </div>
        </Container>
    </header>
  )
}
