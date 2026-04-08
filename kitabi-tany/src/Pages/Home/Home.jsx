import React from "react";
import { Link } from "react-router-dom";
import NewNavbar from "../../Component/Shared/NewNavbar";
import NewFooter from "../../Component/Shared/NewFooter";

const Home = () => {
  return (
    <div className="text-on-surface">
      <NewNavbar />

      <main className="pt-20">
        {/* Hero Section */}
        <section className="relative min-h-[870px] flex items-center overflow-hidden bg-surface">
          <div className="absolute inset-0 z-0">
            <img
              className="w-full h-full object-cover opacity-20 dark:opacity-40 grayscale-[0.3]"
              alt="cinematic shot of a grand wooden library with dust motes dancing in warm sunlight beams streaming through tall windows"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBa0hM1uP8SsTfDlPT9U7GW4zEkh7L_nSk13kWCnxxN3nObaL-wdX0WZ2i_E5On4cPTlxA3j5Zbj0iTOSpBZ0XuKwUbL9eXZsb8fR3xAOstjREzKV7NXCcW2ciJKfz_c1Dbgv4lat1BdWmvuD0h-22qWtFz-80NswIdk-YIvTMcJeMzZI_0d_fgkKRnkOLSJe73gas-gtuuLhuKzMte-SuYq7kTFaz5rItzW_qYrLIyBiQrjG4KVkfR2CFIxLb8tJ_9j6yduPJLKfCn"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-surface via-transparent to-surface-container-low"></div>
          </div>
          <div className="container mx-auto px-8 relative z-10 grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-8 text-right md:text-left" dir="rtl">
              <h1 className="text-6xl md:text-8xl font-arabic font-bold text-primary leading-tight">
                اشتري كتب <br />
                <span className="text-surface-tint">أرخص 70%</span>
              </h1>
              <p className="text-xl text-on-surface-variant font-manrope font-light max-w-lg leading-relaxed">
                Curating the finest pre-loved literary treasures. Sustainable,
                affordable, and deeply nostalgic. Join our community of 10k+
                bibliophiles.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Link
                  to="/home"
                  className="bg-primary text-on-primary px-10 py-5 rounded-lg font-manrope font-semibold text-lg hover:translate-y-[-2px] transition-all duration-300 shadow-xl shadow-primary/10 text-center"
                >
                  Browse Collection
                </Link>
                <Link
                  to="/register"
                  className="bg-secondary-container text-on-secondary-container px-10 py-5 rounded-lg font-manrope font-semibold text-lg border border-transparent hover:border-on-secondary-container/20 transition-all duration-300 text-center"
                >
                  Sell Your Books
                </Link>
              </div>
            </div>
            <div className="hidden md:flex justify-center relative">
              {/* Asymmetric Floating Book Cards */}
              <div className="relative w-80 h-[480px] bg-surface-container-highest rounded-xl shadow-2xl rotate-[-3deg] z-20 overflow-hidden transform hover:rotate-0 transition-transform duration-500">
                <img
                  className="w-full h-full object-cover"
                  alt="vintage leather book cover with gold embossing sitting on a rustic wooden table with soft side lighting"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuAi3W4vURxEqGjrPMGXvloeZkonT19BmG7V9PUEgy3wZ2G6UBgFgN9VhZknBvj2cMQzCJYbj6hYSmrJ3i8gCYIIncxTLc-XdmRG89ouLs7pVf52BvnIMIpxHkCLVmHu_X83FD55ueYrOhIDR6zs-HH7Ziv8E4s0QCmAaL-XLa_DUZv8m_RThOhTIufKfTxCURwVlaCC0gfB6lITKGUkDoDyYGflC0u7t9a86-HejmYuxyRhilmuh4XpwDgHZ4nMDdM9jho9ekJn_mNR"
                />
              </div>
              <div className="absolute -right-12 top-20 w-64 h-[400px] bg-surface-container-low rounded-xl shadow-2xl rotate-[6deg] z-10 overflow-hidden">
                <img
                  className="w-full h-full object-cover"
                  alt="stack of diverse modern novels with colorful spines arranged artistically in a bright minimalist room"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuDs0JMX98qWuIHJD4dk8paUPXNXvrGsyV-nW460u101m-A5DDmFli35lC45aQ4qomnfr8q8kV3osSB6KsDsqtVSiTDGSVAOGHhhs4mBlrEP4BgiCEEpNOsxP2Zx11r_WljTl47jTeOayHSEs2mnwcnjA1P5EEe0va4G5APNwujIUfPbrIhnMlwXf9oOUM9UIgrZTe6rMDYKPNeF-F_i5JErXyA01EOohY7iJy1rM515mkvRDrkGOj48Dt-4KVAF_Je6UBoMwwXSzeJV"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Central Search & Filters */}
        <section className="max-w-5xl mx-auto -mt-16 px-8 relative z-30">
          <div className="bg-surface-container-lowest p-6 rounded-2xl shadow-[0_20px_40px_rgba(27,28,26,0.05)]">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-grow relative">
                <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-outline">
                  search
                </span>
                <input
                  className="w-full pl-12 pr-6 py-4 bg-surface-container-high rounded-xl border-none focus:ring-2 focus:ring-primary-container text-on-surface placeholder-on-surface-variant/60 font-manrope"
                  placeholder="Search by title, author, or ISBN..."
                  type="text"
                />
              </div>
              <div className="flex gap-2">
                <button className="bg-surface-container-high px-6 py-4 rounded-xl font-manrope font-medium text-on-surface flex items-center gap-2 hover:bg-surface-container-highest transition-colors">
                  <span className="material-symbols-outlined text-sm">tune</span>
                  Filters
                </button>
                <Link
                  to="/home"
                  className="bg-primary text-on-primary px-8 py-4 rounded-xl font-manrope font-bold hover:opacity-90 transition-opacity flex items-center"
                >
                  Find Books
                </Link>
              </div>
            </div>
            <div className="flex flex-wrap gap-3 mt-6">
              <span className="text-xs font-manrope uppercase tracking-widest text-on-surface-variant font-bold">
                Trending Searches:
              </span>
              <Link
                className="text-xs font-manrope uppercase tracking-widest text-primary hover:underline"
                to="/home"
              >
                Virginia Woolf
              </Link>
              <Link
                className="text-xs font-manrope uppercase tracking-widest text-primary hover:underline"
                to="/home"
              >
                Arabic Poetry
              </Link>
              <Link
                className="text-xs font-manrope uppercase tracking-widest text-primary hover:underline"
                to="/home"
              >
                Self-Help Classics
              </Link>
            </div>
          </div>
        </section>

        {/* Categories Bento Grid */}
        <section className="py-24 max-w-7xl mx-auto px-8">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-4xl font-notoSerif text-primary mb-2">
                Explore by Genre
              </h2>
              <p className="text-on-surface-variant font-manrope">
                Curated selections across all literary horizons.
              </p>
            </div>
            <Link
              className="text-primary font-manrope font-bold border-b-2 border-primary-container pb-1 hover:text-on-primary-container transition-colors"
              to="/home"
            >
              View All Categories
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 h-[600px]">
            {/* Fiction Card */}
            <div className="md:col-span-2 relative rounded-2xl overflow-hidden group">
              <img
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                alt="ethereal photo of an open book with pages fluttering in the wind against a soft sunset background"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAd__w3-myymwbVhHChBJ0BfYHlsOlddvx1FM3z_eOzJdsKqVzoFyHuKFJyYPGXCAao0sGpEcG-pAEVTx43BXBLcL_jBHb1CkOFak1w3f-XCmEt4dkZq-1ktA-CzX-uRMZaSARFks8iMsXMrrQeXl-touACU0TjtgWLCKoKNwV2IucUlZwbVY6FSukJAPTh74An6YSWsFysZm6EDnQ5g2cYycXL_o6YhIhLd_5EjUX7XxNgaiLk36PEX2Qztu9HO7CJP95_trAbHKgx"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/80 to-transparent"></div>
              <div className="absolute bottom-8 left-8 text-white">
                <h3 className="text-3xl font-notoSerif mb-2">Fiction</h3>
                <p className="font-manrope opacity-80">
                  Lose yourself in other worlds.
                </p>
              </div>
            </div>
            {/* Academic Card */}
            <div className="relative rounded-2xl overflow-hidden group">
              <img
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                alt="close up of a student reading a thick academic textbook in a quiet library corner with soft desk lamp light"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDWx4gHYHhYviA9fMgnYz4nGC3RKdTx3jbPtP8lpVp3IXyQyAGN9vhknNbU-ZabCKtowdDsrjs5r1wfuNCg4l2D5CXOFlUr6ytfbxETsBtqZ6abmA9K7QdpESHBQKsXP0HQ-1FfH7KcJiYw4OQX4lBcbFaDyUihnlxqnLaoAHeRjzKbbga9AmoVwQ_i4QSzBpH7EtsrRJCaNk5x9KU1a4UReGPOeTA3dU3XltgyT-luRhHR8dvLchYkqVZXp_mE63ifun8Slnr3mHJI"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/80 to-transparent"></div>
              <div className="absolute bottom-8 left-8 text-white">
                <h3 className="text-2xl font-notoSerif mb-1">Academic</h3>
                <p className="text-sm font-manrope opacity-80">
                  Knowledge for all.
                </p>
              </div>
            </div>
            {/* Classics Card */}
            <div className="relative rounded-2xl overflow-hidden group">
              <img
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                alt="old vintage books stacked on a wooden shelf with antique brass accents and a warm nostalgic atmosphere"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCIfNRlMG6I5s76eVSMdDULM_T0dcLydjMj7aOyFq-Em2in2acrKJmzO2ld2q7zHb1pDYN5H4FVRDmgUnUK2Jr-TQ1uuxLBnvAVAzm2QDWnhjdQYSippwyvRUqgQcxvMNKGi5CTkJPLIuuNKZC-JAPi1ihP9of0bt_z4pFo9--O2L6Uu9Le2q31Or0NLB4o_AFjqdQGyWfik0kuhvgPnqCfqRpdQObO_dYMJ8EalAZugv1TGALO3QvHVS4mKXtwJgmoEvRVGZ_uaCwr"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/80 to-transparent"></div>
              <div className="absolute bottom-8 left-8 text-white">
                <h3 className="text-2xl font-notoSerif mb-1">Classics</h3>
                <p className="text-sm font-manrope opacity-80">
                  Timeless stories.
                </p>
              </div>
            </div>
            {/* Self-help Card */}
            <div className="md:col-span-2 relative rounded-2xl overflow-hidden group">
              <img
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                alt="person meditatively holding a self-improvement book in a bright airy room with indoor plants"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuD7-uGubIbpN93hdsJku28vrjn3kPRq-w_w9UuJOuQdLX8PnHoAvrJc570jFB29K2oLoZsQ9wDzDNDolc1s7xBDfsFpxm_0gcbT3jKSR4UYAVXSF_su6LXQxYbxpI6JVDk6BPpE77QRwlJZpScl1p4SWQghud1njoz4UkLG_1TgEYMG2UddbFTl_Rq503ejo3HYBnawSN0a8KcEY6il1cjJdLKSQmZYWyP0cAN4oWnf-YJeLK5pUl0fJcAgsfLg6Je7VyYvr07Pj9N7"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/80 to-transparent"></div>
              <div className="absolute bottom-8 left-8 text-white">
                <h3 className="text-3xl font-notoSerif mb-2">Self-Help</h3>
                <p className="font-manrope opacity-80">
                  Empower your journey.
                </p>
              </div>
            </div>
            {/* Rare Finds Card */}
            <div className="md:col-span-2 relative rounded-2xl overflow-hidden group">
              <img
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                alt="ancient manuscript with intricate calligraphy and worn parchment texture under a magnifying glass"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuC-Ho3NrEAkvgvbaZcFBaPcz-6iyx888fp9McPtcXqm2WW6XoBomfSNyLAOK5xCsVlXFSAqUerHN_rJ3pjrJld54CHUi1bQd1QiOKjyYHYLzN6iY2DfyjL9A7juQ6mcJLeCairlbqNN_kbP-TTAxsMNspG2su0NwGfmGlhyfuiunwKwchJI5jG4C-j2Y5U7AeIjcFmxL9M9OtLk5pJkHRzfDtqy2VunYebakZONkNNGxwQDswV9-0Le_r2Nc_tRghy5IyUAk37PbwEf"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/80 to-transparent"></div>
              <div className="absolute bottom-8 left-8 text-white">
                <h3 className="text-3xl font-notoSerif mb-2">Rare Finds</h3>
                <p className="font-manrope opacity-80">Collectors items.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Trending Now Horizontal Scroll */}
        <section className="py-12 overflow-hidden">
          <div className="max-w-7xl mx-auto px-8 mb-10">
            <h2 className="text-3xl font-notoSerif text-primary">
              Trending Now
            </h2>
            <div className="w-20 h-1 bg-tertiary-container mt-2"></div>
          </div>
          <div className="flex overflow-x-auto gap-8 px-8 md:px-[calc((100vw-80rem)/2+2rem)] hide-scrollbar snap-x">
            {/* Book Card 1 */}
            <div className="min-w-[280px] snap-start group">
              <div className="aspect-[2/3] bg-surface-container rounded-xl overflow-hidden mb-4 relative shadow-sm hover:shadow-xl transition-shadow duration-300">
                <img
                  className="w-full h-full object-cover"
                  alt="front cover of a contemporary psychological thriller novel with dark moody colors and sharp typography"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuCTV0t_I3gZHpz-YqvbTpUKsKPbEt5NhX1OoCeVlAiWFBEeBXBoJl6-4X_uQYPqtSZ5gF-4Wy3CiAvbwtFZV5RukyIHON8Q-Vp3W56s9bWc2fZJdGUgShpZdILzFtrLw1ZYowvJ08HD9xDRCCKtpDgLKA0M3zf_BDyvHXQ-U2O_NEL0uLtxWa69SmJ1lW_XErBIjVKxd2f7PdTX_OphuK2suxpEkJBG1Tn6jAxIAsZr6r6qlJp2eKLJhumtbH-NxalCCeAJvFzJrkPv"
                />
                <div className="absolute top-4 right-4 bg-primary text-white text-[10px] font-manrope font-bold px-3 py-1 rounded-full uppercase tracking-tighter">
                  New
                </div>
              </div>
              <h4 className="font-notoSerif text-lg text-primary group-hover:text-surface-tint transition-colors">
                The Midnight Library
              </h4>
              <p className="font-manrope text-sm text-on-surface-variant mb-2">
                Matt Haig
              </p>
              <div className="flex items-center gap-3">
                <span className="font-manrope font-bold text-lg">EGP 120</span>
                <span className="font-manrope text-sm text-outline line-through">
                  EGP 450
                </span>
              </div>
            </div>
            {/* Book Card 2 */}
            <div className="min-w-[280px] snap-start group">
              <div className="aspect-[2/3] bg-surface-container rounded-xl overflow-hidden mb-4 relative shadow-sm hover:shadow-xl transition-shadow duration-300">
                <img
                  className="w-full h-full object-cover"
                  alt="classic literature book cover with ornate floral designs and elegant serif title text"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuDH8DX5bVhFpwoI04aNsVt75CgZ7zagXs832HdFy_oWjx9EsX0qh7SZAcwdq7Z354nEis_uDDsEtf9o1fo07UZyxNjROLFFeWwdHciZAj3CsbZ6Jyu2zRTGnzCL4UTJ3cKrqT6TIQtoXO-8X6aEjZsnW0hPFRDPOWXtSNrqDwokuXxEcM1iZwl205CS3fhwuhTOdKeSxrIfEBlX91LJT-F-_d2eJ5uDPVjkqneJaEs_MUnd5KyPlZCQahQJm-8nPBxFJNOyr6kq2Z-A"
                />
              </div>
              <h4 className="font-notoSerif text-lg text-primary group-hover:text-surface-tint transition-colors">
                Crime and Punishment
              </h4>
              <p className="font-manrope text-sm text-on-surface-variant mb-2">
                Fyodor Dostoevsky
              </p>
              <div className="flex items-center gap-3">
                <span className="font-manrope font-bold text-lg">EGP 180</span>
                <span className="font-manrope text-sm text-outline line-through">
                  EGP 600
                </span>
              </div>
            </div>
            {/* Book Card 3 */}
            <div className="min-w-[280px] snap-start group">
              <div className="aspect-[2/3] bg-surface-container rounded-xl overflow-hidden mb-4 relative shadow-sm hover:shadow-xl transition-shadow duration-300">
                <img
                  className="w-full h-full object-cover"
                  alt="scientific textbook cover with abstract geometric patterns and clean modern design"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuD6PYCid6UMuShz8_0CBxFZbqeiWwEfec118mhqx8Qwb_6Osp0BWLoxjaKkaZVyjD-0t4KdH-ZxJNvdThnQ-huHmvdnCVoZgJ7n0ubmfgmkj3IGCQgJxs6duloIv8CaqcsBuBS1vjrm9aa3qEB59zgzsDVJvcUB99l_jWhvflpzIhfNTF6lU5VNQf4CuuEPt5CQqlkO8wiQg5kzWYMb43TF0svLn7Wjbv9ser1KHHt3xPo4SMs92NVs1aUYMfsxybxOdoodY-ViT4bm"
                />
              </div>
              <h4 className="font-notoSerif text-lg text-primary group-hover:text-surface-tint transition-colors">
                Astrophysics for People in a Hurry
              </h4>
              <p className="font-manrope text-sm text-on-surface-variant mb-2">
                Neil deGrasse Tyson
              </p>
              <div className="flex items-center gap-3">
                <span className="font-manrope font-bold text-lg">EGP 95</span>
                <span className="font-manrope text-sm text-outline line-through">
                  EGP 320
                </span>
              </div>
            </div>
            {/* Book Card 4 */}
            <div className="min-w-[280px] snap-start group">
              <div className="aspect-[2/3] bg-surface-container rounded-xl overflow-hidden mb-4 relative shadow-sm hover:shadow-xl transition-shadow duration-300">
                <img
                  className="w-full h-full object-cover"
                  alt="thick fantasy novel cover featuring an epic sword and dragon emblem with high-contrast lighting"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuBI2lKrqOPIctwldncnojo7PCkd1sMj0vN5cfkX-yD6QcwJ-gFHVZEwJVKJXgySIMhz-LYjVNM2j_nNB2szCEo8JDljuzWG1rOc6EbPjbt9MRCOkTxY3dXStbxtJhhRmJMQDLv5cXzZVYLIzIbJXgbEok0seC9X1kDBJZwmDC7ogYdPvHNvuFuZJOXEsnVASefcgsnUsdTUDnC5uemCk8sW3bwYAFXGJz0_rTWppE5xkl-RWs2PcxC7AN4kV84JAojuHxWbbHj01iv2"
                />
              </div>
              <h4 className="font-notoSerif text-lg text-primary group-hover:text-surface-tint transition-colors">
                The Name of the Wind
              </h4>
              <p className="font-manrope text-sm text-on-surface-variant mb-2">
                Patrick Rothfuss
              </p>
              <div className="flex items-center gap-3">
                <span className="font-manrope font-bold text-lg">EGP 210</span>
                <span className="font-manrope text-sm text-outline line-through">
                  EGP 700
                </span>
              </div>
            </div>
            {/* Book Card 5 */}
            <div className="min-w-[280px] snap-start group">
              <div className="aspect-[2/3] bg-surface-container rounded-xl overflow-hidden mb-4 relative shadow-sm hover:shadow-xl transition-shadow duration-300">
                <img
                  className="w-full h-full object-cover"
                  alt="biography book cover featuring a portrait of a notable historical figure in black and white"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuCIdiMdSE-ZSElKRrvJJxNDV05KG7lV85hBc53MC_ttXCwEsOnT7RcEhD4hme5mnusnVupqmN6eWjDFJqVdoaQMxUu7lln8m5QACuhlWBFxV0x_oIEfxfgKjiEN_-t7jUrQofdTIdfw5mHinl0lVvJAAaZJo9wGQigsyDHhA-HCGSO0zqbc0D_TcWt7QqijsxHL70i7RDQk4-Qb_wL0W0ME3Hb4-O2rM-2aEfGg5hybKrOfOWhfT3v-9sfgF9dkqE2pJ23lIjwdcQvd"
                />
              </div>
              <h4 className="font-notoSerif text-lg text-primary group-hover:text-surface-tint transition-colors">
                A Promised Land
              </h4>
              <p className="font-manrope text-sm text-on-surface-variant mb-2">
                Barack Obama
              </p>
              <div className="flex items-center gap-3">
                <span className="font-manrope font-bold text-lg">EGP 250</span>
                <span className="font-manrope text-sm text-outline line-through">
                  EGP 850
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Trust Badges */}
        <section className="py-20 bg-surface-container-low mt-12">
          <div className="max-w-7xl mx-auto px-8 grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
            <div className="flex flex-col items-center space-y-4 group">
              <div className="w-16 h-16 bg-surface-container-lowest rounded-full flex items-center justify-center text-primary-container shadow-sm group-hover:scale-110 transition-transform">
                <span className="material-symbols-outlined text-4xl">
                  verified_user
                </span>
              </div>
              <h3 className="text-xl font-notoSerif text-primary">
                Verified Sellers
              </h3>
              <p className="text-sm font-manrope text-on-surface-variant leading-relaxed">
                Every listing is hand-vetted for condition accuracy and
                authenticity.
              </p>
            </div>
            <div className="flex flex-col items-center space-y-4 group">
              <div className="w-16 h-16 bg-surface-container-lowest rounded-full flex items-center justify-center text-primary-container shadow-sm group-hover:scale-110 transition-transform">
                <span className="material-symbols-outlined text-4xl">
                  local_shipping
                </span>
              </div>
              <h3 className="text-xl font-notoSerif text-primary">
                Safe Shipping
              </h3>
              <p className="text-sm font-manrope text-on-surface-variant leading-relaxed">
                Protective packaging ensuring your treasures arrive in pristine
                condition.
              </p>
            </div>
            <div className="flex flex-col items-center space-y-4 group">
              <div className="w-16 h-16 bg-surface-container-lowest rounded-full flex items-center justify-center text-primary-container shadow-sm group-hover:scale-110 transition-transform">
                <span className="material-symbols-outlined text-4xl">
                  monetization_on
                </span>
              </div>
              <h3 className="text-xl font-notoSerif text-primary">
                Price Guarantee
              </h3>
              <p className="text-sm font-manrope text-on-surface-variant leading-relaxed">
                The best value in the region. Found it cheaper? We'll match it.
              </p>
            </div>
          </div>
        </section>

        {/* Recently Added - Editorial Style */}
        <section className="py-24 max-w-7xl mx-auto px-8">
          <div className="flex flex-col md:flex-row gap-16 items-center">
            <div className="md:w-1/3">
              <h2 className="text-5xl font-notoSerif text-primary leading-tight mb-6">
                Fresh from the Shelves
              </h2>
              <p className="text-lg font-manrope text-on-surface-variant mb-8">
                Discover our latest acquisitions. From contemporary bestsellers
                to forgotten gems, our collection grows daily.
              </p>
              <Link
                to="/home"
                className="bg-primary text-on-primary px-8 py-4 rounded-lg font-bold hover:bg-primary-container transition-colors inline-block"
              >
                Browse New Arrivals
              </Link>
            </div>
            <div className="md:w-2/3 grid grid-cols-2 md:grid-cols-3 gap-6">
              {/* Smaller Cards for "Recently Added" */}
              <div className="bg-surface-container-lowest p-4 rounded-xl shadow-sm hover:translate-y-[-4px] transition-transform">
                <img
                  className="w-full aspect-[3/4] object-cover rounded-lg mb-3"
                  alt="vintage book cover with gold lettering on a soft green background"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuD8_XcidRyxOigoYgzTQYrcciIgneDWNr32nNBf3b4Es7FP1_9fcEbwmPlfnC0x-d9XM1TW9j9BLmDtMZ_FIOKcDuSvJlskvMBeC8OLxLMISGdDdq0DNMi328H9tAZqHjfRFCL641jMjvinwRIkEAVgaR_FrE-oKlLrm6lzFAgttV4A35J4Xe4yJzvTsYt7kLx-jSctH35TodveOQfDUkmenChVAoS3Z_rXgE7UKFIC_xiLxfww5nUriuZkCUBenxjS1-onJv-UAOQT"
                />
                <p className="text-xs font-manrope font-bold text-surface-tint uppercase">
                  Fiction
                </p>
                <h5 className="text-md font-notoSerif text-primary truncate">
                  Normal People
                </h5>
              </div>
              <div className="bg-surface-container-lowest p-4 rounded-xl shadow-sm hover:translate-y-[-4px] transition-transform">
                <img
                  className="w-full aspect-[3/4] object-cover rounded-lg mb-3"
                  alt="dramatic fantasy novel cover with a silhouetted castle against a stormy purple sky"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuBBQdU7oTQ7MZgeRj0MR2fhDhuoEDI1-GDnIstrNwAoHcKR5yD8aPnykouk8KOzHsnv8EB7qRdtPmMcI8UWT2wZIiEdplRcEIFQ7SfgZV_2BPiKRBc60zHQIDoMMtmj_oc2iI-RDJ8x26vpfBWcerpiOMITryAw01XnPAGcAbkGynCOMM5tmgoCuklc3Jw1a-uQLsYbGnntz8tv9UeXESRfZQNAHEQvF0_YP1WBGEt6_gmxfNy1HI8gn1CRxgsycdnZJn86AblClaam"
                />
                <p className="text-xs font-manrope font-bold text-surface-tint uppercase">
                  Fantasy
                </p>
                <h5 className="text-md font-notoSerif text-primary truncate">
                  The Witcher
                </h5>
              </div>
              <div className="bg-surface-container-lowest p-4 rounded-xl shadow-sm hover:translate-y-[-4px] transition-transform hidden md:block">
                <img
                  className="w-full aspect-[3/4] object-cover rounded-lg mb-3"
                  alt="ornate leather-bound book cover with intricate gold foil patterns"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuDpofcbh_X5TeRgzfkNLlyZ-5zc1yGJH-GGDYiFwBFzxSRf8YEVLt899KY6q2DFI4BgUsfCykQKP1f75sAi2dXzXk8vrcLkev9f9ObxllCXbB_4A5jLA_G32sZdtN7N4akTmD-txpgE5-OGAC6hfki3jD_euuxUaIkYHIruwoc_DKVtEVYi38zW85dfQsevQXBWDCUCp8VNKIHIwAtBMRNSc5AsEPrtVztbqbVYNH5EiQTXuvNAhvovU8j6sVcsLXnmlkUJmZf5YayS"
                />
                <p className="text-xs font-manrope font-bold text-surface-tint uppercase">
                  Classic
                </p>
                <h5 className="text-md font-notoSerif text-primary truncate">
                  Great Expectations
                </h5>
              </div>
            </div>
          </div>
        </section>
      </main>

      <NewFooter />
    </div>
  );
};

export default Home;
