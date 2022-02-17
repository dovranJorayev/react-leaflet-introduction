type SpinnerLoaderProps = React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>;

function SpinnerLoader(props: SpinnerLoaderProps): JSX.Element {
  return (
    <div {...props}>
      <span>
        Loading...  
      </span>  
    </div>
  );
}

export default SpinnerLoader;