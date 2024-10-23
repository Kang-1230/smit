import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";

export default function Dropdown() {
  return (
    <Menu>
      <div className="bottom-24 right-4">
        <MenuButton className="text-xl font-bold border-zinc-950 border rounded-full ... w-12 h-12">
          +
        </MenuButton>
        <MenuItems anchor="top">
          <MenuItem>
            <a className="block data-[focus]:bg-blue-100 right-4" href="/write">
              스터디 그룹 생성
            </a>
          </MenuItem>
          <MenuItem>
            <a
              className="block data-[focus]:bg-blue-100 right-4"
              href="/write/study"
            >
              스터디 모집글 작성
            </a>
          </MenuItem>
        </MenuItems>
      </div>
    </Menu>
  );
}
