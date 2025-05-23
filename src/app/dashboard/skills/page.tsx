import SkillForm from '@/components/skills/SkillForm';
const skillPage = () => {
    return (
        <div className='flex container flex-col justify-center items-center mx-auto min-h-screen '> {/* ADD min-h-screen here */}
            <SkillForm />
        </div>
    );
};

export default skillPage;