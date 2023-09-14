document.querySelector("#bag").addEventListener("click", () => {
  if (!flaga) {
    gsap.to("#list", {
      opacity: 1,
    });
    flaga = !flaga;
  } else {
    gsap.to("#list", {
      opacity: 0,
    });
    flaga = !flaga;
  }

  document.getElementById("list").innerHTML = "";

  tab.forEach((item) => {
    const div = document.createElement("div");
    div.classList.add("monster");
    const img = document.createElement("img");
    img.src = item.faceset;
    div.append(img);

    div.addEventListener("click", (e) => {
      tab.forEach((sel) => {
        sel.select = false;
      });
      item.select = true;
      activeMonsterPlayer = item;
      resetClick();
      div.classList.add("active");
    });
    div.addEventListener("mouseenter", (e) => {
      if (flaga) {
        gsap.to("#description", {
          opacity: 1,
        });
        document.querySelector("#description").innerHTML = "";
        const div1 = document.createElement("div");
        div1.classList.add("monsterDescription");
        const div2 = document.createElement("div");
        div2.innerHTML = `<p>${item.name}</p><p>${item.lvl} LVL</p>
          <p>${item.exp}/${item.capturedExp} EXP</p>
          <p>Type:${item.type}</p>`;
        div1.append(img);
        div1.append(div2);
        const div3 = document.createElement("div");
        div3.innerHTML = "<h1>Attacks:</h1>";
        item.attacks.forEach((at) => {
          div3.innerHTML += `<p>${
            at.name !== "Caught"
              ? `${at.name} dmg: ${at.damage + item.dmg} type: ${at.type}`
              : ""
          } </p>`;
        });
        document.querySelector("#description").append(div1);
        document.querySelector("#description").append(div3);
      }
    });
    div.addEventListener("mouseout", (e) => {
      gsap.to("#description", {
        opacity: 0,
      });
    });
    item.select ? div.classList.add("active") : "";
    div.innerHTML += `${item.name} - ${item.lvl} lvl `;
    document.getElementById("list").append(div);
  });
});

function resetClick() {
  document.querySelectorAll(".monster").forEach((item) => {
    item.classList.remove("active");
  });
}
