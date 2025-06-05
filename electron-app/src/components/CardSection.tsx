import { Link } from "react-router-dom";
import { Lock } from "lucide-react";

interface Feature {
    text: string;
    link: string;
}

interface CardSectionProps {
    title: string;
    features: Feature[];
    imageUrl: string;
    linkTo: string;
    hasAccess: boolean;
}

const CardSection = ({ title, features, imageUrl, linkTo, hasAccess }: CardSectionProps) => {
    const cardClasses = `
    relative w-1/2 h-96 rounded-xl overflow-hidden shadow-lg group transition-all duration-300
    ${!hasAccess ? "cursor-not-allowed opacity-50" : ""}
  `;

    console.log("imageUrl en CardSection:", imageUrl);
    return (
        <div className={cardClasses}>
            {/* Imagen de fondo */}
            <img
                src={imageUrl}
                alt={title}
                className="absolute inset-0 object-cover w-full h-full z-0 h-s"
            />

            {/* Overlay con título */}
            <div className="absolute inset-0 flex items-center justify-center z-10">
                <h3 className="cuarto text-6xl text-center drop-shadow-[0_0_8px_black] font-bold">{title}</h3>
            </div>

            {/* Hover: funcionalidades o candado */}
            <div className="absolute inset-0 bg-gray-500 opacity-0 group-hover:opacity-95 transition-all flex items-center justify-center text-center px-4 z-20">
                {hasAccess ? (
                    <ul className="text-white space-y-8 font-bold text-left text-2xl">
                        {features.map((feature, index) => (
                            <li key={index}>
                                <Link to={feature.link} className="underline hover:text-cuarto block">
                                    {feature.text}
                                </Link>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <Lock className="text-white w-1/2 h-1/2" />
                )}
            </div>

            {/* Link solo si tiene acceso */}
            {hasAccess && <Link to={linkTo} className="absolute inset-0 z-30" />}
        </div>

    );
};

export default CardSection;
