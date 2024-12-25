Prove that $\mathrm{Fib}(n)$ is the closest integer to $\frac{\phi^n}{\sqrt[]{ 5 }}$​, where $\phi = \frac{1+\sqrt[]{ 5 }}{2}$. Hint: Use induction and the definition of the Fibonacci numbers to prove that $\mathrm{Fib}(n) = \frac{\phi^n - \psi^n}{\sqrt[]{ 5 }}$, where $\psi = \frac{1-\sqrt[]{ 5 }}{2}$.

$$
\begin{align}
\mathrm{Fib}(n-2) + \mathrm{Fib}(n-1) & = \mathrm{Fib}(n) \\ \\
\frac{\phi^{n-2} - \psi^{n-2}}{\sqrt[]{ 5 }} + \frac{\phi^{n-1} - \psi^{n-1}}{\sqrt[]{ 5 }} & = \frac{\phi^{n} - \psi^{n}}{\sqrt[]{ 5 }} && \mid  \cdot \sqrt[]{ 5 }\\
\phi^{n-2} - \psi^{n-2} + \phi^{n-1} - \psi^{n-1} & = \phi^{n} - \psi^{n} \\
\frac{\phi^{n}}{\phi^{2}} - \frac{\psi^{n}}{\psi^{2}} + \frac{\phi^{n} \cdot \phi}{\phi^{2}} - \frac{\psi^{n} \cdot \psi}{\psi^{2}} & =  \phi^{n} - \psi^{n}\\
\frac{\phi^{n}(1 + \phi)}{\phi^{2}} - \frac{\psi^{n}(1 + \psi)}{\psi^{2}} & = \phi^{n} - \psi^{n}\\
\phi^{n} \cdot \frac{1+\phi}{\phi^{2}} - \psi^{n} \cdot \frac{1 + \psi}{\psi^{2}} & = \phi^{n} - \psi^{n} && \mid \text{insert } \phi,\psi\\
\phi^{n} \cdot \frac{1+\left( \frac{1}{2} + \frac{\sqrt[]{ 5 }}{2} \right)}{\left( \frac{1}{2} + \frac{\sqrt[]{ 5 }}{2} \right)^{2}} - \psi^{n} \cdot \frac{1 + \left( \frac{1}{2} - \frac{\sqrt[]{ 5 }}{2} \right)}{\left( \frac{1}{2} - \frac{\sqrt[]{ 5 }}{2} \right)^{2}} & = \phi^{n} - \psi^{n} \\
\phi^{n} \cdot \frac{\frac{3}{2} +\frac{\sqrt[]{ 5 }}{2}}{\frac{3}{2} +\frac{\sqrt[]{ 5 }}{2}} - \psi^{n} \cdot \frac{\frac{3}{2} -\frac{\sqrt[]{ 5 }}{2}}{\frac{3}{2} -\frac{\sqrt[]{ 5 }}{2}} & = \phi^{n} - \psi^{n} \\
\phi^{n} - \psi^{n}  & = \phi^{n} - \psi^{n}
\end{align}
$$
