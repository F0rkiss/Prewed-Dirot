import { supabase } from '../../lib/supabase.js';

const ProfileSection = () => {
  const { data: dirot } = supabase.storage
      .from('Media')
      .getPublicUrl('images/ProfileDirot.jpg');

  const { data: anya } = supabase.storage
      .from('Media')
      .getPublicUrl('images/ProfileAnya.jpg');
  return (
    <section className="flex items-center justify-center pt-8 relative">
      <div className="flex flex-col items-center gap-8 z-10 max-w-md mx-auto pb-10">
        {/* ...existing code... */}
        <div className="text-3xl md:text-3xl font-light text-gray-300 tracking-wider font-serif">
          <img className="max-w-60 rounded-[1vw] " src={dirot.publicUrl} alt="Profile Dirot" />
        </div>
        <div className='text-gray-300 mb-3 text-base items-center tracking-wider'>
          <div className='text-center'>
            <h3 className='text-3xl font-serif'>I Made Dirotsaha Pradnyana S.S.</h3>
            {/* <h1 className='text-1xl font-serif font-bold'>Dirot</h1> */}
            <p>Putra kedua dari pasangan</p>
            <p className='font-serif'>Bapak I Gede Simbadi</p>
            <p>& </p>
            <p className='font-serif'>Ibu I Kade Mardaniati </p>
          </div>
        </div>
          
          {/* I want to make a line verticaly in here, im using it as a gap between this 2 things here */}
          <div className="my-6 h-24 w-px bg-white/80"></div>

        <div className="text-3xl md:text-3xl font-light text-gray-300 tracking-wider font-serif">
          <img className="max-w-60 rounded-[1vw] " src={anya.publicUrl} alt="Profile Anya" />
        </div>
        <div className='text-gray-300 mb-3 text-base items-center tracking-wider'>
          <div className='text-center'>
            <h1 className='text-3xl font-serif'>I Gusti Ayu Pt Pradnya Dewi S.M</h1>
            {/* <h3 className='text-1xl font-serif font-bold'>Anya</h3> */}
            <p>Putri pertama dari pasangan</p>
            <p className='font-serif capitalize'>Bapak I gusti ketut sujana putra</p>
            <p>& </p>
            <p className='font-serif capitalize'>Ibu gusti ayu made mastini </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProfileSection;