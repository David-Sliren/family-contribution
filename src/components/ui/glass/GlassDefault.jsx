import { UltraGlass } from "./svg-glass/FilterGlasses";
import styles from "./glass.module.css";
import { cn } from "@/utils/cn";

export const GlassDefault = ({
  children,
  className,
  classNameWrapper,
  classNameTint = "",
}) => {
  return (
    <div className={cn(styles.liquidGlassWrapper, classNameWrapper)}>
      <div className={cn(styles.liquidGlassEffect)}></div>
      <div className={cn("absolute inset-0 z-1", classNameTint)}></div>
      <div className={cn(styles.liquidGlassShine)}></div>
      <div className={cn("z-3", className)}>{children}</div>
      <UltraGlass />
    </div>
  );
};
