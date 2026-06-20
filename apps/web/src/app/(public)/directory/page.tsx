import React from 'react'
import {SearchBar} from '@/components/common/search-bar';
import { ProfileContainer } from '@/components/directory/sections/profile-container';
import { HeaderSection } from '@/components/directory/sections/header-section';

const page = () => {
  return (
    <main className="bg-main pt-3 px-10 grid gap-8 pb-20 max-w-6xl">
      <HeaderSection/>
      <SearchBar/>
      <ProfileContainer/>
    </main>
  );
}

export default page