magnitude() and etc. is only defined for polar and rectangle tags and not for the complex tag

The apply_generic function is called twice. The first time when the get function searches for the magnitude and complex tags and the second time when the get function searches for the magnitude and rectangle tags. So at first the outer tag ist used and the the inner tag. First the magnitude function on complex tags is dispatched and then the magnitude function of the rectangle package


