import React from 'react'

import ProfileCard from '@/components/directory/ProfileCard'
import { MOCK_PROFILES } from '@/data/profiles'

const page = () => {
  return (
    <main className="bg-backAlt pt-3 px-10 grid gap-6 pb-20">
      <section className="flex flex-col gap-2 max-w-2xl">
        <h1 className="font-bold text-4xl">Women's Directory</h1>
        <p className="text-[var(--color-muted)] font-semibold">
          A searchable, filterable directory of women making an impact across
          all fields. Every profile is verified to highlight real achievements
          and contributions.
        </p>
      </section>

      <section>
        {/* women's profile container */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {MOCK_PROFILES.map((profile) => (
            <ProfileCard key={profile.id} profile={profile} />
          ))}
        </div>
      </section>
    </main>
  );
}

export default page