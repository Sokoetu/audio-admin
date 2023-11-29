import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";

const SheetContainer = ({
  trigger,
  children,
  width, // to adjust width of sheet 
}: {
  trigger: React.ReactNode;
  children: React.ReactNode;
  width?: string;
}) => {
  return (
    <Sheet>
      <SheetTrigger>{trigger}</SheetTrigger>
      <SheetContent
        className={`${width && width} h-full flex flex-col`}
      >
        {children}
      </SheetContent>
    </Sheet>
  );
};

export default SheetContainer;
