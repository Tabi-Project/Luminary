import React from 'react'

const page = () => {
  return (
    <main className="bg-backAlt pt-3 px-10 grid gap-6">
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
        <p>test</p>
      </section>
    </main>
  );
}

export default page