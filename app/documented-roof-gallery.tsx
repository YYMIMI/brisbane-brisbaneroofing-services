import type { ProjectCase } from "./site-data";

function Photo({ image }: { image: ProjectCase["images"][number] }) {
  return (
    <figure className="project-photo">
      <img src={image.src} alt={image.alt} width={image.width} height={image.height} loading="lazy" />
      <span className="project-stage">{image.stage}</span>
      <figcaption>{image.caption}</figcaption>
    </figure>
  );
}

export function DocumentedRoofGallery({ project }: { project: ProjectCase }) {
  return (
    <div className="documented-roof-gallery">
      <h3>Roof cleaning before and after</h3>
      <div className="project-gallery project-gallery-pair documentary-photos">
        {project.images.filter(image => image.group === "primary").sort((a, b) => Number(b.stage === "After cleaning") - Number(a.stage === "After cleaning")).map(image => <Photo image={image} key={image.src} />)}
      </div>
      <details className="documentary-photo-group" open>
        <summary>View the work-in-progress photos</summary>
        <div className="project-gallery documentary-photos">
          {project.images.filter(image => image.group === "process").sort((a, b) => Number(b.src.includes("ridge-pointing")) - Number(a.src.includes("ridge-pointing"))).map(image => <Photo image={image} key={image.src} />)}
        </div>
      </details>
      <details className="documentary-photo-group">
        <summary>View more roof condition and cleaning photos</summary>
        <div className="project-gallery documentary-photos">
          {project.images.filter(image => image.group === "additional").map(image => <Photo image={image} key={image.src} />)}
        </div>
      </details>
      {project.video ? (
        <figure className="documentary-video">
          <h3>Watch the roof-junction work</h3>
          <video controls playsInline preload="none" poster={project.video.poster} width={project.video.width} height={project.video.height} aria-label={project.video.caption}>
            <source src={project.video.src} type="video/mp4" />
            Your browser does not support this video.
          </video>
          <figcaption>{project.video.caption} <a className="text-link" href={project.video.src}>Open the site video</a></figcaption>
        </figure>
      ) : null}
    </div>
  );
}
