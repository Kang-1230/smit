import Image from "next/image";

export default function Background() {
  return (
    <div className="absolute left-0 top-0 -z-10 h-[50rem] w-full overflow-hidden bg-gradient-to-b from-primary-100 via-[#FFC799]">
      <Image
        src="/images/SunCloud.svg"
        alt="sun-cloud"
        layout="fill"
        objectFit="cover"
        className="hidden md:block"
      />
      <Image
        src="/images/SunCloudMobile.svg"
        alt="sun-cloud"
        layout="fixed"
        width={500}
        height={300}
        className="mx-auto md:hidden"
      />
    </div>
  );
}
