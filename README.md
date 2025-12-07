# Quiz app - DevOps projekt - D3ERIQ

## Felhasznált technológiák

1. **Git:** Verziókezelés
2. **Jenkins:** CI pipeline (build, docker push, deploy) - automatizáció
3. **Docker & Docker Hub:** konténerizáció és image tárolás
4. **Kubernetes:** deployment, service
5. **Helm:** csomagkezelés a monitorozó rendszer telepítéséhez
6. **Prometheus:** metrikák gyűjtése
7. **Grafana:** adatok vizualizációja

## CI/CD pipeline

A rendszer `Jenkinsfile`-t használ, amely a következőket hajtja végre:

1. **Test:** Tesztek futtatása 
2. **Build:** A Dockerfile segítségével felépíti az image-et (Angular build + Node.js szerver)
3. **Push:** Feltölti a kész image-et Docker hub-ra
4. **Deploy:** A `kubectl` segítségével frissíti a Kubernetes deploymentet az új verzióra, és újraindítja a podokat

## Telepítés és futtatás

### Előfeltételek
- Docker Desktop (Kubernetes engedélyezése)
- Helm telepítése

### User role beállítása
Ha az appban egy kvízt szeretnénk készíteni, azt csak admin role-lal lehet, amit külön be kell állítani a db-ben:
A mongodb podjában mongo shellt (mongosh) nyitva, pl. "teszt" nevű user esetén:
```bash
use quiz-db
db.users.updateOne( { name: "teszt" }, { $set: { role: "admin" } } )
```

### Monitorozás elindítása
A Prometheus és Grafana stack telepítése Helmmel:
```bash
helm repo add prometheus-community [https://prometheus-community.github.io/helm-charts](https://prometheus-community.github.io/helm-charts)
helm install monitoring prometheus-community/kube-prometheus-stack -n monitoring
```

Port forwarding:
```bash
kubectl port-forward -n monitoring svc/monitoring-grafana 3000:80
```