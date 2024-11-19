import Image from "next/image";

interface ImageSectionProps {
  image: string;
  name: string;
}

const ImageSection = ({ image, name }: ImageSectionProps) => (
  <div className="w-full rounded-t-[28px]">
    <Image
      priority
      className="h-[9.5rem] w-full rounded-t-[28px] object-cover"
      src={image || ""}
      alt={name || "study-image"}
      width={350}
      height={152}
    />
  </div>
);

export default ImageSection;
